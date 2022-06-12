import {Component, OnInit} from '@angular/core';
import {ProfitniCentar} from "../../shared/profitni-centar.model";
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {BookkeepingJournal} from "../../shared/bookkeeping-journal.model";
import {BookkeepingJournalService} from "../../services/bookkeeping-journal/bookkeeping-journal.service";
import {ProfitniCentarService} from "../../services/profitni-centar/profitni-centar.service";
import {Konto} from "../../shared/invoice.model";

@Component({
  selector: 'app-profitni-centar',
  templateUrl: './profitni-centar.component.html',
  styleUrls: ['./profitni-centar.component.css']
})
export class ProfitniCentarComponent implements OnInit {

  profitniCentri: ProfitniCentar[];
  treeControl = new NestedTreeControl<ProfitniCentar>(node => node.profitniCentarList);
  dataSource = new MatTreeNestedDataSource<ProfitniCentar>();
  knjizenja: BookkeepingJournal[];
  selectedProfitniCentar: ProfitniCentar;
  odgovornaLica: number[] = [];
  lokacije: number[] = [];

  constructor(private knjizenjeService: BookkeepingJournalService, private profitniCentarService: ProfitniCentarService) {
  }

  ngOnInit(): void {
    this.fetchAllProfitniCentri();
    this.knjizenjeService.getKnjizenja().subscribe((data) => {
      this.knjizenja = data;
    });
  }

  fetchAllProfitniCentri(): void {
    this.profitniCentarService.getAll().subscribe(data => {
      this.profitniCentri = data;
      this.formatData();
      this.dataSource.data = this.profitniCentri;
    })
  }

  formatData(): void {
    this.profitniCentri.forEach(item => {
      if (!this.odgovornaLica.includes(item.odgovornoLiceId)) {
        this.odgovornaLica.push(item.odgovornoLiceId);
      }
      if (!this.lokacije.includes(item.lokacijaId)) {
        this.lokacije.push(item.lokacijaId);
      }
      item.profitniCentarList = this.profitniCentri.filter(function (element) {
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

  dfsCalculation(curr: ProfitniCentar, sum: number): number {
    sum += curr.ukupniTrosak;
    if (curr.profitniCentarList) {
      for (let i = 0; i < curr.profitniCentarList.length; i++) {
        sum = this.dfsCalculation(curr.profitniCentarList[i], sum);
      }
    }
    return sum;
  }

  dfsReassignment(curr: ProfitniCentar): ProfitniCentar {
    curr = this.reassignObject(curr);
    if (curr.profitniCentarList) {
      for (let i = 0; i < curr.profitniCentarList.length; i++) {
        curr.profitniCentarList[i] = this.dfsReassignment(curr.profitniCentarList[i]);
      }
    }
    return curr;
  }

  popup(knjizenjeIndex: number, profitniCentarIndex: number): void {
    let text = 'Da li zelite da iz knjiženja(' +
      this.knjizenja[knjizenjeIndex].brojNaloga +
      ') dodelite listu konta profitnom centru(' +
      this.profitniCentri[profitniCentarIndex].naziv + ')?';
    if (confirm(text) == true) {
      this.profitniCentarService.addKontosFromKnjizenje(this.knjizenja[knjizenjeIndex], this.profitniCentri[profitniCentarIndex]).subscribe(
        data => {

          // const dummyKontoList = [
          //   new Konto(new KontnaGrupa('konto-1', '1231'), 100, 50, true, false, false, false),
          //   new Konto(new KontnaGrupa('konto-2', '1232'), 200, 60, true, false, false, false),
          //   new Konto(new KontnaGrupa('konto-3', '1233'), 300, 70, true, false, false, false),
          //   new Konto(new KontnaGrupa('konto-4', '1234'), 400, 80, true, false, false, false),
          //   new Konto(new KontnaGrupa('konto-5', '1235'), 500, 90, true, false, false, false),
          //   new Konto(new KontnaGrupa('konto-6', '1236'), 600, 100, true, false, false, false),
          // ]
          // data.kontoList = dummyKontoList;
          //
          // data.kontoList.forEach(item => {
          //   item.knjizenje = this.knjizenja[knjizenjeIndex];
          // });
          this.fetchAllProfitniCentri();
        });
    }
  }

  izmeniKonto(konto: Konto, editableKomentar: HTMLTextAreaElement): void {
    let index: number = this.selectedProfitniCentar.kontoList.findIndex(item => item.bazniKontoId === konto.bazniKontoId);
    let newKonto: Konto = this.selectedProfitniCentar.kontoList[index];
    newKonto.komentarKnjizenja = editableKomentar.value;
    this.selectedProfitniCentar.kontoList[index] = newKonto;
    this.izmeniProfitniCentarKontos(this.selectedProfitniCentar);
  }

  obrisiKonto(konto: Konto): void {
    this.selectedProfitniCentar.kontoList = this.selectedProfitniCentar.kontoList.filter(data => data != konto);
    this.izmeniProfitniCentarKontos(this.selectedProfitniCentar);
  }

  sacuvajProfitniCentar(newProfCentarNaziv: HTMLInputElement, newProfCentarSifra: HTMLInputElement,
    newProfCentarLokacijaId: HTMLSelectElement, newProfCentarOdgLiceId: HTMLSelectElement, newProfCentarRoditelj: HTMLSelectElement): void {
    let newProfitniCentar: ProfitniCentar = {
      sifra: newProfCentarSifra.value,
      naziv: newProfCentarNaziv.value,
      ukupniTrosak: 0,
      lokacijaId: this.lokacije[newProfCentarLokacijaId.selectedIndex],
      odgovornoLiceId: this.odgovornaLica[newProfCentarOdgLiceId.selectedIndex],
      parentProfitniCentar: this.profitniCentri[newProfCentarRoditelj.selectedIndex],
      kontoList: []
    }
    this.profitniCentarService.save(newProfitniCentar).subscribe(() => {
      this.fetchAllProfitniCentri();
    });
  }

  izmeniProfitniCentar(profCentar: ProfitniCentar, editableNazivCentra: HTMLInputElement, editableOdgLice: HTMLSelectElement,
    editablelokacijaId: HTMLSelectElement): void {
    profCentar.naziv = editableNazivCentra.value;
    profCentar.odgovornoLiceId = this.odgovornaLica[editableOdgLice.selectedIndex];
    profCentar.lokacijaId = this.lokacije[editablelokacijaId.selectedIndex];
    this.profitniCentarService.update(profCentar).subscribe(data => {
      this.fetchAllProfitniCentri()
    });
  }

  izmeniProfitniCentarKontos(profCentar: ProfitniCentar): void {
    this.profitniCentarService.update(profCentar).subscribe(data => {
      this.fetchAllProfitniCentri()
    });
  }

  obrisiProfitniCentar(profCentar: ProfitniCentar): void {
    this.profitniCentarService.delete(profCentar.id).subscribe(() => {
        this.profitniCentri = [];
        this.fetchAllProfitniCentri();
      }
    );
  }

  calculateUkupniTrosak(node: ProfitniCentar): number {
    let sum: number = node.ukupniTrosak;
    if (node.profitniCentarList) {
      for (let i = 0; i < node.profitniCentarList.length; i++) {
        sum = this.dfsCalculation(node.profitniCentarList[i], sum);
      }
    }

    if (node.kontoList) {
      node.kontoList.forEach(konto => {
        sum += (konto.duguje + konto.potrazuje);
      })
    }
    return sum;
  }

  getIcon(node: ProfitniCentar): string {
    return this.treeControl.isExpanded(node) ? '-' : '+';
  }

  getAsDate(date: string): string {
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
    window.scrollTo(0, document.body.scrollHeight);
  }

}
