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

  findAll(title?: Book['title'], author?: Book['author']): Observable<Book[]> {
    if(title) {
      return this.apiCallService.get<Book[]>(`${this.booksUrl}?title=${title}`);
    }
    if(author) {
      return this.apiCallService.get<Book[]>(`${this.booksUrl}?author=${author}`);
    }
    return this.apiCallService.get<Book[]>(this.booksUrl);
  }

  findOneById(id: string): Observable<Book> {
    return this.apiCallService.get(`${this.booksUrl}/${id}`)
  }

  update(id: string, bookDto: BookDTO): Observable<Book> {
    return this.apiCallService.patch(`${this.booksUrl}/${id}`, bookDto)
  }

  delete(id: string): Observable<any> {
    return this.apiCallService.delete(`${this.booksUrl}/${id}`)
  }
}
