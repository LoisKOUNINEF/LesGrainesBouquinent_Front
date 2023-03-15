import { Comment } from "./comment.model";
import { BaseModel } from "./shared/base.model";
import { User } from "./user.model";

export class Book extends BaseModel {
	title: string;
	author: string;
	description: string;
	picture: URL;
	comments: Comment[];
	user: User;

	constructor(
		title: string,
		author: string,
		description: string,
		picture: URL,
		comments: Comment[] = [],
		user: User,
	) {
    super();
    this.title = title;
    this.author = author;
    this.description = description;
    this.picture = picture;
    this.comments = comments;
    this.user = user;
  }
}