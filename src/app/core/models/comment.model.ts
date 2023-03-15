import { Book } from "./book.model";
import { BaseModel } from "./shared/base.model";
import { User } from "./user.model";

export class Comment extends BaseModel {
	content: string;
	user: User;
	book: Book;

	constructor(
		content: string,
		user: User,
		book: Book,
	) {
    super();
    this.content = content;
    this.user = user;
    this.book = book;
  }
}