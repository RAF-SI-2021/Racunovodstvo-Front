export interface User {
  userId: number
  username: string,
  firstName: string,
  lastName: string,
  permissions: Permissions[]
}
export class User{
  userId: number
  username: string;
  firstName: string;
  lastName: string;

  constructor(
    userId: number,
    username: string,
    firstName: string,
    lastName: string,

  ) {
    this.userId = userId
    this.username = username
    this.firstName = firstName
    this.lastName = lastName
  }
}
export interface Users {
  users: User[];
}
export class Permission{
  name: string;
  constructor(name: string) {
    this.name = name
  }
}

export interface DnevnikKnjizenja{
  knjizenjeId: number;
  brojNaloga: string;
  datumKnjizenja: Date;
  duguje: number;
  potrazuje: number;
  dokumentId:number;
  saldo: number;
  komentar: string;
}

export class DnevnikKnjizenja{
  knjizenjeId: number;
  brojNaloga: string;
  datumKnjizenja: Date;
  duguje: number;
  potrazuje: number;
  dokumentId:number;
  saldo: number;
  komentar: string;

  constructor(
    knjizenjeId: number,
    brojNaloga: string,
    datumKnjizenja: Date,
    duguje: number,
    potrazuje: number,
    dokumentId:number,
    saldo: number,
    komentar: string
  ) {
    this.knjizenjeId = knjizenjeId;
    this.datumKnjizenja = datumKnjizenja;
    this.brojNaloga = brojNaloga;
    this.duguje = duguje;
    this.potrazuje = potrazuje;
    this.dokumentId = dokumentId;
    this.saldo = saldo;
    this.komentar = komentar;
  }
}



