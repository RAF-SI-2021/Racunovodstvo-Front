export interface Zaposleni {
  zaposleniId: number,
  ime: string,
  prezime: string,
  imeRoditelja: string,
  pocetakRadnogOdnosa: Date,
  jmbg: string,
  pol: string,
  datumRodjenja: Date,
  adresa: string,
  grad: string,
  radnaPozicija: string, // ? ili radnoMesto - fali u apiju
  brojRacuna: string,
  stepenObrazovanja: string,
  brojRadneKnjizice: number,
  statusZaposlenog: string,
  komentar: string,
  staz: Staz
}

export interface Staz {
  pocetakRada: string,
  krajRada: string

}
// neto plata ?
// staz
export interface User {
  userId: number;
  username: string;
  firstName: string;
  lastName: string;
  permissions: Permissions[];
}
