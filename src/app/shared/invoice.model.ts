export class Invoice {
	constructor(
		public fakturaId: number,
		public brojFakture: string,
		public datumIzdavanja: string,
		public rokZaPlacanje: string,
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
		public tipDokumenta: string,
		public brojDokumenta: string
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
	public content: any[] = [];
}

export class Konto {
	kontnaGrupa: KontnaGrupa;
	duguje: number;
	potrazuje: number;
	addOrDeleteEdit: boolean;
	disabledKonto: boolean;
	disabledDuguje: boolean;
	disabledPotrazuje: boolean;

	constructor(
		konto: KontnaGrupa,
		duguje: number,
		potrazuje: number,
		addOrDeleteEdit: boolean,
		disabledKonto: boolean,
		disabledDuguje: boolean,
		disabledPotrazuje: boolean
	) {
		this.kontnaGrupa = konto;
		this.duguje = duguje;
		this.potrazuje = potrazuje;
		this.addOrDeleteEdit = addOrDeleteEdit;
		this.disabledKonto = disabledKonto;
		this.disabledDuguje = disabledDuguje;
		this.disabledPotrazuje = disabledPotrazuje;
	}
}

export class KontnaGrupa {
	nazivKonta: string;
	brojKonta: string;
	konto?: Konto;

	constructor(nazivKonta: string, brojKonta: string) {
		this.nazivKonta = nazivKonta;
		this.brojKonta = brojKonta;
	}
}
