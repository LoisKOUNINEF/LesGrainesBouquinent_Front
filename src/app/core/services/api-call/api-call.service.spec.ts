import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ENV } from 'src/environments/environments.provider';

import { ApiCallService } from './api-call.service';

describe('ApiCallService', () => {
  const env = { production: false }

  let service: ApiCallService;

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
});
