import {Zaposleni} from "./profile.model";

export interface Obracun{
  obracunId: number;
  naziv: string;
  sifraTransakcije: string;
  datumObracuna: Date;
  obracunZaposleniList: ObracunZaposleni[];
  obradjen: boolean;
}

export interface ObracunZaposleni{
  obracunZaposleniId: number;
  ucinak: number;
  porez: number;
  doprinos1: number;
  doprinos2: number;
  netoPlata: number;
  brutoPlata: number;
  ukupanTrosakZarade: number;
  komentar: string;
  zaposleni: Zaposleni;
  obracun: Obracun
}

export interface SifraTransakcije{
  sifraTransakcijeId: number;
  sifra: number;
  nazivTransakcije: string;
}

export interface ObracunZaradeConfig{
  dayOfMonth: number;
  SifraTransakcijeId: number;
}
