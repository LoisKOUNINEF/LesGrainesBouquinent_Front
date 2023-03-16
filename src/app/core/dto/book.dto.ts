export class BookDTO {
	title: string | undefined;
	author: string | undefined;
	description: string | undefined;

	constructor(formValue: BookFormValue) {
		this.title = formValue.title;
		this.author = formValue.author;
		this.description = formValue.description;
	}
}

export interface BookFormValue {
	title?: string;
	author?: string;
	description?: string;
}