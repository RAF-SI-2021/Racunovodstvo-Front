export interface Konverzija{
  konverzijaId: number;
  brojKonverzije: string;
  datum: Date;
  dobavljacId: number;
  // lokacijaId: number;
  troskoviNabavke: [TrosakNabavke];
  fakturnaCena: number;
  nabavnaVrednost: number;
  valuta: string;
  lokacija: Lokacija
  nazivLokacija: string;
  adresaLokacije: string;
  nazivDobavljaca: string;
  komentar: string;
  hidden: boolean;
}

export interface Lokacija{
  lokacijaId?: number;
  naziv?: string;
  adresa?: string;
}

export interface Preduzece{
  preduzeceId: number;
  naziv: string;
  pib: string;
  racun: string;
  adresa: string;
  grad: string;
  telefon: string;
  email: string;
  fax: string;
  webAdresa: string;
  komentar: string
}

export interface TrosakNabavke{
  trosakId: number;
  trosak: number;
}

export interface Artikal{
  artikalId: number;
  sifraArtikla: string;
  nazivArtikla: string;
  jedinicaMere: string;
  kolicina: number;
  nabavnaCena: number;
  rabatProcenat: number;
  rabat: number;
  nabavnaCenaPosleRabata: number;
  ukupnaNabavnaVrednost: number;
  konverzijaKalkulacijaId: number;
  prodajnaCena: number;
  istorijaProdajneCene: Istorija
}

export interface Istorija{
  timestamp: string;
  prodajnaCena: number
}

