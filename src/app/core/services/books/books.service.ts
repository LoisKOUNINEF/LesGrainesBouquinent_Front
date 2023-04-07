import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookDTO } from '../../dto/book.dto';
import { Book } from '../../models/book.model';
import { ApiCallService } from '../api-call/api-call.service';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private readonly booksUrl = '/books';

  constructor(private apiCallService: ApiCallService) { }

  create(bookDto: BookDTO): Observable<Book> {
    return this.apiCallService.post<Book>(this.booksUrl, bookDto)
  }

  findAll(title?: Book['title'], author?: Book['author']): Observable<Book[]> {
    if(title) {
      return this.apiCallService.get<Book[]>(`${this.booksUrl}?title=${title}`);
    }
    if(author) {
      return this.apiCallService.get<Book[]>(`${this.booksUrl}?author=${author}`);
    }
    return this.apiCallService.get<Book[]>(this.booksUrl);
  }

  findOneById(id: Book['id']): Observable<Book> {
    return this.apiCallService.get<Book>(`${this.booksUrl}/${id}`)
  }

  update(id: Book['id'], bookDto: BookDTO): Observable<Book> {
    return this.apiCallService.patch<Book>(`${this.booksUrl}/${id}`, bookDto)
  }

  delete(id: Book['id']): Observable<any> {
    return this.apiCallService.delete<Book>(`${this.booksUrl}/${id}`)
  }
}
