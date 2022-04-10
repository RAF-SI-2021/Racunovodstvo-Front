export class KontnaGrupa {
	kontnaGrupaId: number;
	brojKonta: string;
	nazivKonta: string;

	constructor(kontnaGrupaId: number, brojKonta: string, nazivKonta: string) {
		this.kontnaGrupaId = kontnaGrupaId;
		this.brojKonta = brojKonta;
		this.nazivKonta = nazivKonta;
	}
}

export interface readKontoResponse {
	content: KontnaGrupa[];
}
