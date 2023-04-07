import { TestBed } from '@angular/core/testing';
import { MockService } from 'ng-mocks';
import { lastValueFrom, of } from 'rxjs';
import { SharedModulesModule } from 'src/app/shared/modules/shared-modules.module';
import { mockBooks } from 'tests/mock-arrays/mock-books-array';
import { BookStub } from 'tests/stub-dto/book.stub';
import { Book } from '../../models/book.model';
import { ApiCallService } from '../api-call/api-call.service';

import { BooksService } from './books.service';

describe('BooksService', () => {
  let service: BooksService;
  let apiCallServiceMock = MockService(ApiCallService);

  const bookDto = new BookStub;
  const books = mockBooks;
  const booksUrl = '/books';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModulesModule,
      ],
      providers: [
        {
          provide: ApiCallService,
          useValue: apiCallServiceMock,
        }
      ],
    });
    service = TestBed.inject(BooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('apiCallServiceMock', () => {
    it('should be defined', () => {
      expect(apiCallServiceMock).toBeDefined();
    });
  });

  describe('findAll method', () => {
    it('should have a findAll method', () => {
      expect(service.findAll).toBeDefined();
      expect(service.findAll).toBeInstanceOf(Function);
    });
    it('should call ApiCallService get method', async () => {
      apiCallServiceMock.get = (jest.fn(() => of(books as Book[]))) as any;
      const booksList = await lastValueFrom(service.findAll());
      expect(apiCallServiceMock.get).toHaveBeenCalled();
      expect(apiCallServiceMock.get).toHaveBeenCalledWith(booksUrl);
      expect(booksList.length).toBe(2);
      expect(booksList[0].title).toBe('La nuit des temps');
    });
  });

  describe('findOneById method', () => {
    it('should have a findOneById method', () => {
      expect(service.findOneById).toBeDefined();
      expect(service.findOneById).toBeInstanceOf(Function);
    });
    it('should call ApiCallService get method', async () => {
      apiCallServiceMock.get = (jest.fn(() => of(books[0] as Book))) as any;
      const book = await lastValueFrom(service.findOneById(books[0].id));
      expect(apiCallServiceMock.get).toHaveBeenCalled();
      expect(apiCallServiceMock.get).toHaveBeenCalledWith(`${booksUrl}/${books[0].id}`);
      expect(book.title).toBe(books[0].title)
    });
  });

  describe('update method', () => {
    it('should have an update method', () => {
      expect(service.update).toBeDefined();
      expect(service.update).toBeInstanceOf(Function);
    });
    it('should call ApiCallService patch method', async () => {
      apiCallServiceMock.patch = (jest.fn(() => of(bookDto as Book))) as any;
      const book = await lastValueFrom(service.update(books[1].id, bookDto));
      expect(apiCallServiceMock.patch).toHaveBeenCalled();
      expect(apiCallServiceMock.patch).toHaveBeenCalledWith(`${booksUrl}/${books[1].id}`, bookDto);
      expect(book.title).toBe(bookDto.title)
    });
  });

  describe('delete method', () => {
    it('should have a delete method', () => {
      expect(service.delete).toBeDefined();
      expect(service.delete).toBeInstanceOf(Function);
    });
    it('should call ApiCallService delete method', async () => {
      apiCallServiceMock.delete = (jest.fn(() => of('deleted' as any))) as any;
      const book = await lastValueFrom(service.delete(books[0].id));
      expect(apiCallServiceMock.delete).toHaveBeenCalled();
      expect(apiCallServiceMock.delete).toHaveBeenCalledWith(`${booksUrl}/${books[0].id}`);
      expect(book).toBe('deleted');
    });
  });
});
