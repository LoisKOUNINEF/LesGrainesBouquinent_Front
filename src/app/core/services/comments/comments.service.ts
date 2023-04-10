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

  findAll(): Observable<Comment[]> {
    return this.apiCallService.get<Comment[]>(this.commentsUrl);
  }

  findOneById(id: Comment['id']): Observable<Comment> {
    return this.apiCallService.get<Comment>(`${this.commentsUrl}/${id}`)
  }

  update(id: Comment['id'], commentDto: CommentDTO): Observable<Comment> {
    return this.apiCallService.patch<Comment>(`${this.commentsUrl}/${id}`, commentDto)
  }

  delete(id: Comment['id']): Observable<any> {
    return this.apiCallService.delete<Comment>(`${this.commentsUrl}/${id}`)
  }
}
