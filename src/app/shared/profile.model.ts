export interface Zaposleni {
	zaposleniId: number;
	ime: string;
	prezime: string;
	imeRoditelja: string;
	pocetakRadnogOdnosa: string;
	jmbg: string;
	pol: string;
	datumRodjenja: string;
	adresa: string;
	grad: string;
	radnaPozicija: string; // ? ili radnoMesto - fali u apiju
	brojRacuna: string;
	stepenObrazovanja: string;
	brojRadneKnjizice: number;
	statusZaposlenog: string;
	komentar: string;
	staz: string;
}

export interface Plata {
	datumOd: Date;
	datumDo: Date;
	netoPlata: number;
	komentar: string;
}
// neto plata ?
// staz
