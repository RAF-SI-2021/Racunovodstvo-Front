export interface IClient {
	preduzeceId?: number;
	naziv: string;
	pib: string;
	racun?: string;
	adresa: string;
	grad: string;
	telefon?: string;
	email?: string;
	fax?: string;
	webAdresa?: string;
	komentar?: string;
  isActive?: boolean
}

export class IClient {
  preduzeceId?: number;
  naziv: string;
  pib: string;
  racun?: string;
  adresa: string;
  grad: string;
  telefon?: string;
  email?: string;
  fax?: string;
  webAdresa?: string;
  komentar?: string;
  isActive?: boolean



  constructor(preduzeceId: number, naziv: string, pib: string, racun: string, adresa: string, grad: string,
              telefon: string, email: string, fax: string, webAdresa: string, komentar: string, isActive: boolean) {
    this.preduzeceId = preduzeceId;
    this.naziv = naziv;
    this.pib = pib;
    this.racun = racun;
    this.adresa = adresa;
    this.grad = grad;
    this.telefon = telefon;
    this.email = email;
    this.fax = fax;
    this.webAdresa = webAdresa;
    this.komentar = komentar;
    this.isActive = isActive;
  }
}
