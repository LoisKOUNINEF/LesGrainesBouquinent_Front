import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../../models/book.model';
import { User } from '../../models/user.model';
import { ApiCallService } from '../api-call/api-call.service';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private readonly booksUrl = '/books';

  constructor(private apiCallService: ApiCallService) { }

  findAll(title?: Book['title'], author?: Book['author']): Observable<Book[]> {
    if(title) {
      return this.apiCallService.get<Book[]>(`${this.booksUrl}?title=${title}`);
    }
    if(author) {
      return this.apiCallService.get<Book[]>(`${this.booksUrl}?author=${author}`);
    }
    return this.apiCallService.get<Book[]>(this.booksUrl);
  }
}
