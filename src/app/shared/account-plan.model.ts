export interface KontnaGrupa {
	kontnaGrupaId: number;
	brojKonta: string;
	//nekad se u response dobije kao naziv nekad kao nazivKonta #spaghettiAndMeatballs
	naziv: string;
	nazivKonta: string;
}

export interface readKontoResponse {
	content: KontnaGrupa[];
}
