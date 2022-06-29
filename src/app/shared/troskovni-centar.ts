import {Konto} from "./invoice.model";

export interface TroskovniCentar{
  id?: number;
  sifra: string;
  naziv: string;
  ukupniTrosak: number;
  lokacijaId: number;
  odgovornoLiceId: number;
  parentTroskovniCentar: TroskovniCentar;
  kontoList: Konto[];
  troskovniCentarList?: TroskovniCentar[];
  showDetails?: boolean;
}

export interface PageableTroskovniCentar {
  content: TroskovniCentar[];
  pageable: {
    sort: {
      empty: boolean,
      sorted: boolean,
      unsorted: boolean
    },
    offset: number,
    pageNumber: number,
    pageSize: number,
    paged: boolean,
    unpaged: boolean
  },
  totalPages: number,
  totalElements: number,
  last: boolean,
  size: number,
  number: number,
  sort: {
    empty: boolean,
    sorted: boolean,
    unsorted: boolean
  },
  numberOfElements: number,
  first: boolean,
  empty: boolean
}

