export interface CurrencyResponse {

  result: CurrencyResult;
  status: string;
  currencies: ["RSD", "EUR", "USD", "CHF", "GBP", "AUD", "CAD", "SEK", "DKK", "NOK",
                "JPY", "RUB", "CNY", "HRK", "KWD", "PLN", "CZK", "HUF", "BAM"];

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
