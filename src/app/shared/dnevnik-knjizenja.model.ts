export interface DnevnikKnjizenja {
	knjizenjeId: number;
	brojNaloga: string;
	datumKnjizenja: Date;
	duguje: number;
	potrazuje: number;
	dokumentId: number;
	saldo: number;
	komentar: string;
}

export class DnevnikKnjizenja {
	knjizenjeId: number;
	brojNaloga: string;
	datumKnjizenja: Date;
	duguje: number;
	potrazuje: number;
	dokumentId: number;
	saldo: number;
	komentar: string;

	constructor(
		knjizenjeId: number,
		brojNaloga: string,
		datumKnjizenja: Date,
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
