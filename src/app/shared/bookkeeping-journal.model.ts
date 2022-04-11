export interface BookkeepingJournal {
	knjizenjeId: number;
	brojNaloga: string;
	datumKnjizenja: string;
	duguje: number;
	potrazuje: number;
	dokumentId: number;
	saldo: number;
	komentar: string;
}

export interface MainBook {
	brojNaloga: number;
	datum: string;
	potrazuje: number;
	duguje: number;
	saldo: number;
	nazivKonta: string;
	konto: string;
	komentar: string;
}

export class BookkeepingJournal {
	knjizenjeId: number;
	brojNaloga: string;
	datumKnjizenja: string;
	duguje: number;
	potrazuje: number;
	dokumentId: number;
	saldo: number;
	komentar: string;

	constructor(
		knjizenjeId: number,
		brojNaloga: string,
		datumKnjizenja: string,
		duguje: number,
		potrazuje: number,
		dokumentId: number,
		saldo: number,
		komentar: string
	) {
		this.knjizenjeId = knjizenjeId;
		this.datumKnjizenja = datumKnjizenja;
		this.brojNaloga = brojNaloga;
		this.duguje = duguje;
		this.potrazuje = potrazuje;
		this.dokumentId = dokumentId;
		this.saldo = saldo;
		this.komentar = komentar;
	}
}
