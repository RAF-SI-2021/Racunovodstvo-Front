export interface LoginResponse {
  jwt: string;
}
export interface User{
  authorities: Auth[];
}
export interface Auth{
  name: string;
}
