import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { createMock } from '@golevelup/ts-jest';
import { ApiCallService } from '../api-call/api-call.service';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
      {
        provide: ApiCallService,
        useValue: createMock<ApiCallService>(),
      }
      ],
    });
    service = TestBed.inject(AuthService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // describe('login request', () => {
  //   it('should login user', () => {
      
  //   });
  // });
});
