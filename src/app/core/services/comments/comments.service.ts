import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentDTO } from '../../dto/comment.dto';
import { Book } from '../../models/book.model';
import { Comment } from '../../models/comment.model';
import { ApiCallService } from '../api-call/api-call.service';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private readonly commentsUrl = '/comments';

  constructor(private apiCallService: ApiCallService) { }

  create(commentDto: CommentDTO, bookId: Book['id']): Observable<Comment> {
    return this.apiCallService.post<Comment>(
      this.commentsUrl, 
      {
        bookId, 
        commentDto
      }
    );
  }
}
