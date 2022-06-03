import {Component, OnInit} from '@angular/core';
import {ProfitniCentar} from "../../shared/profitni-centar.model";
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {BookkeepingJournal} from "../../shared/bookkeeping-journal.model";
import {BookkeepingJournalService} from "../../services/bookkeeping-journal/bookkeeping-journal.service";
import {ProfitniCentarService} from "../../services/profitni-centar/profitni-centar.service";
import {KontnaGrupa, Konto} from "../../shared/invoice.model";

@Component({
  selector: 'app-profitni-centar',
  templateUrl: './profitni-centar.component.html',
  styleUrls: ['./profitni-centar.component.css']
})
export class ProfitniCentarComponent implements OnInit {

  profitniCentri: ProfitniCentar[];
  treeControl = new NestedTreeControl<ProfitniCentar>(node => node.children);
  dataSource = new MatTreeNestedDataSource<ProfitniCentar>();
  knjizenja: BookkeepingJournal[];
  selectedProfitniCentar: ProfitniCentar;

  constructor(private knjizenjeService: BookkeepingJournalService, private profitniCentarService: ProfitniCentarService) {
  }

  ngOnInit(): void {
    this.profitniCentarService.getAll().subscribe(data => {
      this.profitniCentri = [...new Map(data.content.map((item) => [item["naziv"], item])).values()];
      this.formatData();
      this.dataSource.data = this.profitniCentri;
    })

    this.knjizenjeService.getKnjizenja().subscribe((data) => {
      this.knjizenja = data;
    });
  }

  formatData(): void {
    this.profitniCentri.forEach(item => {
      item.children = this.profitniCentri.filter(function (element) {
          return element.parentProfitniCentar && element.parentProfitniCentar.id == item.id;
        }
      );
    })

    for (let i = 0; i < this.profitniCentri.length; i++) {
      this.profitniCentri[i] = this.dfsReassignment(this.profitniCentri[i]);
    }
  }

  reassignObject(source: ProfitniCentar): ProfitniCentar {
    return Object.assign({}, source);
  }

  getIcon(node: ProfitniCentar): string {
    return this.treeControl.isExpanded(node) ? '-' : '+';
  }

  calculateUkupniTrosak(node: ProfitniCentar): number {
    let sum: number = node.ukupniTrosak;
    if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        sum = this.dfsCalculation(node.children[i], sum);
      }
    }

    if (node.kontoList) {
      node.kontoList.forEach(konto => {
        sum += (konto.duguje + konto.potrazuje);
      })
    }
    return sum;
  }

  dfsCalculation(curr: ProfitniCentar, sum: number): number {
    sum += curr.ukupniTrosak;
    if (curr.children) {
      for (let i = 0; i < curr.children.length; i++) {
        sum = this.dfsCalculation(curr.children[i], sum);
      }
    }
    return sum;
  }

  dfsReassignment(curr: ProfitniCentar): ProfitniCentar {
    curr = this.reassignObject(curr);
    if (curr.children) {
      for (let i = 0; i < curr.children.length; i++) {
        curr.children[i] = this.dfsReassignment(curr.children[i]);
      }
    }
    return curr;
  }

  popup(knjizenjeIndex: number, profitniCentarIndex: number) {
    let text = 'Da li zelite da iz knjiženja(' +
      this.knjizenja[knjizenjeIndex].brojNaloga +
      ') dodelite listu konta profitnom centru(' +
      this.profitniCentri[profitniCentarIndex].naziv + ')?';
    if (confirm(text) == true) {
      this.profitniCentarService.addKontosFromKnjizenje(this.knjizenja[knjizenjeIndex], this.profitniCentri[profitniCentarIndex]).subscribe(
        data => {

          const dummyKontoList = [
            new Konto(new KontnaGrupa('konto-1', '1231'), 100, 50, true, false, false, false),
            new Konto(new KontnaGrupa('konto-2', '1232'), 200, 60, true, false, false, false),
            new Konto(new KontnaGrupa('konto-3', '1233'), 300, 70, true, false, false, false),
            new Konto(new KontnaGrupa('konto-4', '1234'), 400, 80, true, false, false, false),
            new Konto(new KontnaGrupa('konto-5', '1235'), 500, 90, true, false, false, false),
            new Konto(new KontnaGrupa('konto-6', '1236'), 600, 100, true, false, false, false),
          ]
          data.kontoList = dummyKontoList;

          data.kontoList.forEach(item => {
            item.knjizenje = this.knjizenja[knjizenjeIndex];
          });
          this.profitniCentri[profitniCentarIndex] = data;
          this.formatData();
          this.dataSource.data = this.profitniCentri;
        });
    }
  }

  getAsDate(date: string) {
    let newDate = new Date(date);
    return (
      newDate.getDate() +
      '/' +
      (newDate.getMonth() + 1) +
      '/' +
      newDate.getFullYear()
    );
  }

  getSaldo(duguje: number, potrazuje: number): number {
    return duguje - potrazuje;
  }

  setSelected(selected: ProfitniCentar): void {
    this.selectedProfitniCentar = selected;
  }

  izmeniKonto(konto: Konto, editableNaziv: HTMLInputElement, editableSaldo: HTMLInputElement, editableKomentar: HTMLTextAreaElement) {
    let newKonto: Konto = this.selectedProfitniCentar.kontoList[this.selectedProfitniCentar.kontoList.findIndex(
      item => item.kontnaGrupa.brojKonta === konto.kontnaGrupa.brojKonta)];
    newKonto.kontnaGrupa.nazivKonta = editableNaziv.value;
    newKonto.duguje = +editableSaldo.value;
    newKonto.potrazuje = 0;
    newKonto.knjizenje.komentar = editableKomentar.value;
    this.selectedProfitniCentar.kontoList[this.selectedProfitniCentar.kontoList.findIndex(
      item => item.kontnaGrupa.brojKonta === konto.kontnaGrupa.brojKonta)] = newKonto;
  }

  obrisiKonto(konto: Konto) {
    this.selectedProfitniCentar.kontoList = this.selectedProfitniCentar.kontoList.filter(data => data != konto);
  }

  izmeniProfitniCentar(profCentar: ProfitniCentar) {

  }

  obrisiProfitniCentar(profCentar: ProfitniCentar) {
    this.profitniCentarService.delete(profCentar.id).subscribe(() =>
      this.profitniCentarService.getAll().subscribe(data => {
        this.profitniCentri = [...new Map(data.content.map((item) => [item["naziv"], item])).values()];
        this.formatData();
        this.dataSource.data = this.profitniCentri;
      }));
  }

}
