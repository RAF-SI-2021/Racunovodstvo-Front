export interface ProfitniCentar{
  id: number
  naziv: string
}


export interface TroskovniCentar{
  id: number
  naziv: string
}


export interface Pageable2<T>{
  content: T[]
}
