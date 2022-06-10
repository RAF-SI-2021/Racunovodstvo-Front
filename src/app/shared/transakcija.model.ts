export interface Transakcija {
  transakcijaId?: number;
  brojTransakcije: number;
  komitentTransakcije: string;
  datumTransakcije: string;
  tipTransakcije: string;
  iznos: number;
  sadrzaj?: string;
  sifraTransakcije: SifraTransakcije;
  komentar?: string;
}

export interface SifraTransakcije {
  sifra:string;
  nazivTransakcije: number;
}
