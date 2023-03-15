import { fakeAsync, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ENV } from 'src/environments/environments.provider';

import { ApiCallService } from './api-call.service';
import { Environment } from 'src/environments/ienvironment';

describe('ApiCallService', () => {
  let env: Environment = { production: false, apiUrl: 'localhost:3000' }

  let service: ApiCallService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule
      ],
      providers: [
        {provide: ENV, useValue: env},
      ],
    });
    service = TestBed.inject(ApiCallService);
  });

  beforeEach(() => httpMock = TestBed.get(HttpTestingController));

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a get method', () => {
    expect(service.get<any>).toBeDefined();
    expect(service.get<any>).toBeInstanceOf(Function);
  });

  it('should have a post method', () => {
    expect(service.post<any>).toBeDefined();
    expect(service.post<any>).toBeInstanceOf(Function);
  });

  it('should have a patch method', () => {
    expect(service.patch<any>).toBeDefined();
    expect(service.patch<any>).toBeInstanceOf(Function);
  });

  it('should have a delete method', () => {
    expect(service.delete<any>).toBeDefined();
    expect(service.delete<any>).toBeInstanceOf(Function);
  });

  it('should make a get request', fakeAsync(() => {
    service.get('/users').subscribe()
    const req = httpMock.expectOne(`${env.apiUrl}/users`)
    expect(req.request.method).toBe('GET')
    req.flush('flush');
  }));

  it('should make a post request', fakeAsync(() => {
    service.post('/users/login').subscribe()
    const req = httpMock.expectOne(`${env.apiUrl}/users/login`)
    expect(req.request.method).toBe('POST')
    req.flush('flush');
  }));

  it('should make a delete request', fakeAsync(() => {
    service.delete('/users/randomString').subscribe()
    const req = httpMock.expectOne(`${env.apiUrl}/users/randomString`)
    expect(req.request.method).toBe('DELETE')
    req.flush('flush');
  }));
  
  it('should make a patch request', fakeAsync(() => {
    service.patch('/users/randomString').subscribe();
    const req = httpMock.expectOne(`${env.apiUrl}/users/randomString`);
    expect(req.request.method).toBe('PATCH');
    req.flush('flush');
  }));
});
