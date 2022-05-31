export class AnalitickeKarticeResponse {
  brojNaloga: string
  datum: string
  brojDokumenta: string
  duguje: number
  potrazuje: number
  saldo: number


  constructor(brojNaloga: string, datum: string, brojDokumenta: string, duguje: number, potrazuje: number, saldo: number) {
    this.brojNaloga = brojNaloga;
    this.datum = datum;
    this.brojDokumenta = brojDokumenta;
    this.duguje = duguje;
    this.potrazuje = potrazuje;
    this.saldo = saldo;
  }
}
