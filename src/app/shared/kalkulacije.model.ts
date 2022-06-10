export interface KalkulacijeModel {
  id: number,
  brojKalkulacije: string,
  tipKalkulacije: string,
  datum: string,
  dobavljacId: number,
  lokacijaId: Lokacija,
  troskoviNabavke: TrosakNabavke[],
  fakturnaCena: number,
  nabavnaVrednost: number,
  valuta: string,
  prodajnaVrednost: number,
  komentar: string
}


export interface TrosakNabavke{
  troskoviNabavkeId?: number,
  cena: number,
  naziv: string
}

export interface KalkulacijaArtikal{
  artikalId: number,
  sifraArtikla: string,
  nazivArtikla: string,
  jedinicaMere: string,
  kolicina: number,
  nabavnaCena: number,
  rabatProcenat: number,
  rabat: number,
  nabavnaCenaPosleRabata: number,
  ukupnaNabavnaVrednost: number,
  marzaProcenat: number,
  marza: number,
  prodajnaOsnovica: number,
  porezProcenat: number,
  porez: number,
  prodajnaCena: number,
  osnovica: number,
  ukupnaProdajnaVrednost: number
}


export interface Lokacija{
  lokacijaId?: number,
  naziv: string,
  adresa: string
}
