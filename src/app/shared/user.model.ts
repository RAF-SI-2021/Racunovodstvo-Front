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
	authorities: Permission[];
}
