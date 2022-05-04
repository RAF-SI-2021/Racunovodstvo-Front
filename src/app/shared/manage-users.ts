export interface User {
	userId: number;
	username: string;
	firstName: string;
	lastName: string;
	permissions: Permission[];
}

export class User {
	userId: number;
	username: string;
	firstName: string;
	lastName: string;

	constructor(
		userId: number,
		username: string,
		firstName: string,
		lastName: string
	) {
		this.userId = userId;
		this.username = username;
		this.firstName = firstName;
		this.lastName = lastName;
	}
}

export interface Users {
	users: User[];
}

export class Permission {
  name: string;
  id: number;
  constructor(name: string, id: number) {
    this.id = id;
    this.name = name;
  }

}
