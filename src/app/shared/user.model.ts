export interface LoginResponse {
  jwt: string;
}

export interface Permission {
  id: number;
  name: string;
  authority: string;
}

export interface User {
  userId: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string
  password: string
  //dont change authorities to permissions, shit dont work then for some reason
  authorities: Permission[];
  permissions: Permission[];
  preduzeceId: number
}

export class User {
  userId: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string
  password: string
  //dont change authorities to permissions, shit dont work then for some reason
  authorities: Permission[];
  permissions: Permission[];
  preduzeceId: number

  constructor(
    userId: number,
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    permissions: Permission[],
  //dont change authorities to permissions, shit dont work then for some reason
    authorities: Permission[],
    preduzeceId: number
  ) {
    this.userId = userId;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.authorities = authorities
    this.permissions = permissions
    this.preduzeceId = preduzeceId
  }

}

export interface Users {
  users: User[];
}

export class Permission {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
