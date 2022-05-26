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
	//dont change authorities to permissions, shit dont work then for some reason
	authorities: Permission[];
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
	constructor(name: string) {
		this.name = name;
	}
}
