export interface Transakcija {
  transakcijaId?: number;
  brojTransakcije: number;
  komitentTransakcije: string;
  datumTransakcije: string;
  tipTransakcije: string;
  iznosTransakcije: number;
  sadrzajTransakcije?: string;
  sifraTransakcije: string;
  komentarTransakcije?: string;
}
