export class Faktura {

  constructor(
    public fakturaId : number,
    public brojFakture : string,
    public datumIzdavanja: Date,
    public preduzece: Preduzece,
    public datumPlacanja : Date,
    public prodajnaVrednost : number,
    public rabatProcenat : number,
    public rabat : number,
    public porezProcenat : number,
    public porez : number,
    public iznos : number,
    public valuta : string,
    public kurs : number,
    public naplata : number,
    public komentar : string,
    public tipFakture : string) {

  }
  public editable : boolean = false;
}

export class Preduzece{
  constructor(public naziv : string) {
  }
}

