export class CommentDTO {
	content: string | undefined;

	constructor(formValue: CommentFormValue) {
		this.content = formValue.content; 
	}
}

export interface CommentFormValue {
	content: string;
}