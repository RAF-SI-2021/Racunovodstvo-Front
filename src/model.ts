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

