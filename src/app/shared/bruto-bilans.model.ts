export interface BrutoBilans {}

export class BilansResponse {
	duguje: number;
	potrazuje: number;
	brojKonta: string;
	nazivKonta: string;
	brojStavki: number;
	saldo: number;

	constructor(
		duguje: number,
		potrazuje: number,
		brojKonta: string,
		nazivKonta: string,
		brojStavki: number,
		saldo: number
	) {
		this.duguje = duguje;
		this.potrazuje = potrazuje;
		this.brojKonta = brojKonta;
		this.nazivKonta = nazivKonta;
		this.brojStavki = brojStavki;
		this.saldo = saldo;
	}
}
