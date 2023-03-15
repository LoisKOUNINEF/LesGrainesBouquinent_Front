export class UserDTO {
	email: string | undefined;
	name: string | undefined;
	password: string | undefined;
	isAdmin?: boolean;

	constructor(formValue: UserFormValue) {
		this.email = formValue.email;
		this.name = formValue.name;
		this.password = formValue.password;
		this.isAdmin = formValue.isAdmin;
	}
}

export interface UserFormValue {
	email?: string;
	name?: string;
	password?: string;
	isAdmin?: boolean;
}
