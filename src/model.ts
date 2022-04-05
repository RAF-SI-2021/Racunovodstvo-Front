
export interface LoginResponse {
  jwt: string
}

export interface Permission {
  id: number
  name: string
  authority: string
}

export interface User {
  userId: number,
  username: string,
  firstName: string,
  lastName: string,
  authorities: Permission[]

}

export interface KontnaGrupa {
  brojKonta: string
  naziv: string
  nazivKonta: string
}

export interface readKontoResponse {
  content: KontnaGrupa[]
}

