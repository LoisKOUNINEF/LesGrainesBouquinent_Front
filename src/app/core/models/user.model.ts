import { Book } from "./book.model";
import { Comment } from "./comment.model";
import { BaseModel } from "./shared/base.model";

export class User extends BaseModel {
	email: string;
	name: string;
	password: string;
	isAdmin?: boolean;
	books: Book[];
	comments: Comment[];

	constructor(
		email: string,
		name: string,
		password: string,
		isAdmin: boolean,
		books: Book[] = [],
		comments: Comment[] = [],
	) {
    super();
    this.email = email;
    this.name = name;
    this.password = password;
    this.isAdmin = isAdmin;
    this.books = books;
    this.comments = comments;
  }
}