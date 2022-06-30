export interface CurrencyResponse {

  result: CurrencyResult;
  status: string;

}


export interface CurrencyResult {

  eur: Currency;
  usd: Currency;
  chf: Currency;
  gbp: Currency;
  aud: Currency;
  cad: Currency;
  sek: Currency;
  dkk: Currency;
  nok: Currency;
  jpy: Currency;
  rub: Currency;
  cny: Currency;
  hrk: Currency;
  kwd: Currency;
  pln: Currency;
  czk: Currency;
  huf: Currency;
  bam: Currency;
}

export interface Currency {
  sre: number;
}
