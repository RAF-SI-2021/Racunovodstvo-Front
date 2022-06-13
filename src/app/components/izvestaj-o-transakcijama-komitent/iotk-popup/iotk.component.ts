import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {IzvestajiService} from "../../../services/izvestaji.service";
import {IzvestajOTransakcijamaKomitentComponent} from "../izvestaj-o-transakcijama-komitent.component";
import {Preduzece} from "../../../shared/invoice.model";
import {DatePipe} from "@angular/common";
import {InvoiceService} from "../../../services/invoice/invoice.service";

@Component({
  selector: 'app-iotk',
  templateUrl: './iotk.component.html',
  styleUrls: ['./iotk.component.css']
})
export class IotkComponent implements OnInit {

  @ViewChild(IzvestajOTransakcijamaKomitentComponent, {static: true})
  child: IzvestajOTransakcijamaKomitentComponent;
  title: string;
  komitenti: Preduzece[];

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private service: IzvestajiService, private datepipe: DatePipe,
    private invoiceService: InvoiceService) {
    this.title = data.title;
  }

  ngOnInit(): void {
    this.invoiceService.svaPreduzeca2().subscribe(data => {
      this.komitenti = data;
    })
  }

  close() {
    if (this.child !== undefined) {
      this.child.closeDialog()
    }
  }

  stampaj(komitent: HTMLSelectElement, naslov: HTMLInputElement, datum1: HTMLInputElement, datum2: HTMLInputElement) {

    if (naslov.value == '' || datum1.value == '' || datum2.value == '') {
      alert('Morate popuniti sva polja!');
    } else {

      this.service.getIzvestajOTransakcijamaZaKomitenta(this.komitenti[komitent.selectedIndex].preduzeceId, naslov.value,
        this.get_correct_date_format(this.datepipe.transform(new Date(datum1.value), 'dd/MM/yyyy')),
        this.get_correct_date_format(this.datepipe.transform(new Date(datum2.value), 'dd/MM/yyyy'))).subscribe(
        res => {
          let file = new Blob([res], {type: 'application/pdf'});
          var fileURL = URL.createObjectURL(file);
          window.open(fileURL);
        }, (error) => {
          alert("Doslo je do greške ucitavnja fajla. Pokušajte ponovo.")
          return;
        });

    }

  }

  get_correct_date_format(date: string): string {
    let split1 = date.split('/')
    return split1[2] + '-' + split1[1] + '-' + split1[0]
  }

}
