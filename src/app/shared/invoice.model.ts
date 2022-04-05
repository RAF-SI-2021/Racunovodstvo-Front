export class Invoice {
  constructor(
    public fakturaId: number,
    public brojFakture: string,
    public datumIzdavanja: string,
    public preduzece: Company,
    public datumPlacanja: string,
    public prodajnaVrednost: number,
    public rabatProcenat: number,
    public rabat: number,
    public porezProcenat: number,
    public porez: number,
    public iznos: number,
    public valuta: string,
    public kurs: number,
    public naplata: number,
    public komentar: string,
    public tipFakture: string,
    public dokumentId: number,
    public tipDokumenta: string
  ) {
    if (rabatProcenat === null) {
      this.rabatProcenat = 0;
    }
    if (rabat == null) {
      this.rabat = 0;
    }
    if (porezProcenat == null) {
      this.porezProcenat = 0;
    }
    if (porez == null) {
      this.porez = 0;
    }
  }

  public editable: boolean = false;
}

export class Company {
  constructor(public naziv: string) {}
}

export class ResponseObject {
  public content: Invoice[] = [];
}
