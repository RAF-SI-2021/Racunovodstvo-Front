import { Zaposleni } from './profile.model';

export interface Plata {
	zaposleni: Zaposleni;
	porez: number;
	doprinos1: number;
	doprinos2: number;
	netoPlata: number;
	brutoPlata: number;
	ukupanTrosakZarade: number;
	datum: string;
	komentar: string;
}
