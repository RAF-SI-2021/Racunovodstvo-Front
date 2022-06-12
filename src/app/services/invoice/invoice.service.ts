import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Invoice,
  Company,
  Konto,
  ResponseObject, Preduzece,
} from 'src/app/shared/invoice.model';
import { environment } from 'src/environments/environment';
import {IClient} from "../../shared/client.model";

@Injectable({
	providedIn: 'root',
})
export class InvoiceService {
	httpHeaders: HttpHeaders = new HttpHeaders({
		Authorization: 'Bearer ' + sessionStorage.getItem('jwt'),
	});

	constructor(private http: HttpClient) {}

	filterKUF(pretraga: string, value: string) {
		if (pretraga.includes('datum') || pretraga.includes('rokZa')) {
			let date = new Date(value);
			let value2 = date.getTime() / 1000 + 24 * 60 * 60;
			value = '' + date.getTime() / 1000;
			return this.http.get<Invoice[]>(
				environment.knjizenjeServiceApi +
					`/api/faktura?search=tipFakture:ULAZNA_FAKTURA,` +
					pretraga +
					`\>${value},` +
					pretraga +
					`\<${value2}`,
				{
					headers: this.httpHeaders,
					observe: 'response',
				}
			);
		}
		return this.http.get<Invoice[]>(
			environment.knjizenjeServiceApi +
				`/api/faktura?search=tipFakture:ULAZNA_FAKTURA,` +
				pretraga +
				`:${value}`,
			{
				headers: this.httpHeaders,
				observe: 'response',
			}
		);
	}

	filterKIF(pretraga: string, value: string) {
		if (pretraga.includes('datum') || pretraga.includes('rokZa')) {
			let date = new Date(value);
			let value2 = date.getTime() / 1000 + 24 * 60 * 60;
			value = '' + date.getTime() / 1000;
			return this.http.get<Invoice[]>(
				environment.knjizenjeServiceApi +
					`/api/faktura?search=tipFakture:IZLAZNA_FAKTURA,` +
					pretraga +
					`\>${value},` +
					pretraga +
					`\<${value2}`,
				{
					headers: this.httpHeaders,
					observe: 'response',
				}
			);
		}
		if (pretraga.includes('rokZa')) {
			let value2 = new Date();
			return this.http.get<Invoice[]>(
				environment.knjizenjeServiceApi +
					`/api/faktura?search=tipFakture:IZLAZNA_FAKTURA,` +
					pretraga +
					`\>${value2},` +
					pretraga +
					`\<${value}`,
				{
					headers: this.httpHeaders,
					observe: 'response',
				}
			);
		}
		return this.http.get<Invoice[]>(
			environment.knjizenjeServiceApi +
				`/api/faktura?search=tipFakture:IZLAZNA_FAKTURA,` +
				pretraga +
				`:${value}`,
			{
				headers: this.httpHeaders,
				observe: 'response',
			}
		);
	}

  svaPreduzeca() {
    return this.http.get<Company[]>(
      environment.preduzeceServiceApi + `/api/preduzece/all`,
      {
        headers: this.httpHeaders,
      }
    );
  }

  svaPreduzeca2() {
    return this.http.get<Preduzece[]>(
      environment.preduzeceServiceApi + `/api/preduzece/all`,
      {
        headers: this.httpHeaders,
      }
    );
  }

  svaPreduzecaIClient() {
    return this.http.get<IClient[]>(
      environment.preduzeceServiceApi + `/api/preduzece/all`,
      {
        headers: this.httpHeaders,
      }
    );
  }

	sveKufFakture() {
		return this.http.get<Invoice[]>(
			environment.knjizenjeServiceApi + `/api/faktura?search=tipFakture:ULAZNA_FAKTURA`,
			{
				headers: this.httpHeaders,
			}
		);
	}

  sveMpFakture() {
    return this.http.get<Invoice[]>(
      environment.knjizenjeServiceApi + `/api/faktura?search=tipFakture:MALOPRODAJNA_FAKTURA`,
      {
        headers: this.httpHeaders,
      }
    );
  }

  sveKifFakture() {
    return this.http.get<Invoice[]>(
      environment.knjizenjeServiceApi + `/api/faktura?search=tipFakture:IZLAZNA_FAKTURA`,
      {
        headers: this.httpHeaders,
      }
    );
  }

	obrisiFakturu(dokumentId: number) {
		return this.http.delete<any>(
			environment.knjizenjeServiceApi + `/api/faktura/${dokumentId}`,
			{
				headers: this.httpHeaders,
				observe: 'response',
			}
		);
	}

	izmeniFakturu(faktura: Invoice) {
		return this.http.put<Response>(
			environment.knjizenjeServiceApi + `/api/faktura`,
			{
				fakturaId: faktura.fakturaId,
				brojFakture: faktura.brojFakture,
				datumIzdavanja: faktura.datumIzdavanja,
				rokZaPlacanje: faktura.rokZaPlacanje,
				datumPlacanja: faktura.datumPlacanja,
				prodajnaVrednost: faktura.prodajnaVrednost,
				porezProcenat:
					faktura.porezProcenat === null ? 0 : faktura.porezProcenat,
				valuta: faktura.valuta,
				kurs: faktura.kurs,
				naplata: faktura.naplata,
				komentar: faktura.komentar === null ? '' : faktura.komentar,
				tipFakture: faktura.tipFakture,
				rabatProcenat:
					faktura.rabatProcenat === null ? 0 : faktura.rabatProcenat,
				preduzece: faktura.preduzece,
				dokumentId: faktura.dokumentId,
				brojDokumenta: faktura.brojDokumenta,
				tipDokumenta: faktura.tipDokumenta,
			},
			{
				headers: this.httpHeaders,
				observe: 'response',
			}
		);
	}

  novaFaktura(brojFakture: string, datumIzdavanja: string, komitent: IClient, rokZaPlacanje: string, datumPlacanja: string, prodajnaVrednost: number,
              rabatProcenat: number, porezProcenat: number, valuta: string, kurs: number, naplata: number, komentar: string, tipFakture: string){
    return this.http.post<Response>(
      environment.knjizenjeServiceApi + `/api/faktura`,
      {
        brojDokumenta: brojFakture,
        brojFakture: brojFakture,
        datumIzdavanja: datumIzdavanja,
        rokZaPlacanje: rokZaPlacanje,
        datumPlacanja: datumPlacanja,
        prodajnaVrednost: prodajnaVrednost,
        porezProcenat: porezProcenat === null ? 0 : porezProcenat > 100 ? 100 : porezProcenat,
        valuta: valuta,
        kurs: kurs,
        naplata: naplata,
        tipFakture: tipFakture,
        komentar: komentar === null ? '' : komentar,
        rabatProcenat: rabatProcenat === null ? 0 : rabatProcenat > 100 ? 100 : rabatProcenat,
        preduzeceId: komitent.preduzeceId,
        rabat: 0,
        iznos: 0,
        porez: 0
      },
      {
        headers: this.httpHeaders,
        observe: 'response',
      }
    );
  }


	getKontneGrupe() {
		return this.http.get<ResponseObject>(
			environment.knjizenjeServiceApi + '/api/konto?sort=brojKonta',
			{
				headers: this.httpHeaders,
			}
		);
	}

	knjizenje(
		kontos: Konto[],
		ukupnoDuguje: number,
		ukupnoPotrazuje: number,
		saldo: number,
		dokumentId: string,
		brojNaloga: string,
		datum: string,
    centar: number
	) {
		return this.http.post(
			environment.knjizenjeServiceApi + '/api/knjizenje',
			{
				datumKnjizenja: datum,
				brojNaloga: dokumentId,
				dokument: {
					brojDokumenta: dokumentId,
					tipDokumenta: 'FAKTURA',
				},
				konto: kontos,
        bazniCentarId: centar
			},
			{
				headers: this.httpHeaders,
			}
		);
	}
}
