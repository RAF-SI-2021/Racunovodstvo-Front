import {Konto} from "./invoice.model";

export interface ProfitniCentar{
  id?: number;
  sifra: string;
  naziv: string;
  ukupniTrosak: number;
  lokacijaId: number;
  odgovornoLiceId: number;
  parentProfitniCentar: ProfitniCentar;
  kontoList: Konto[];
  profitniCentarList?: ProfitniCentar[];
  showDetails?: boolean;
}

export interface PageableProfitniCentar {
  content: ProfitniCentar[];
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
