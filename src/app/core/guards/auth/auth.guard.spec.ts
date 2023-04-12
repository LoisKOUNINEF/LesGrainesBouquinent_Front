import { TestBed } from '@angular/core/testing';
import { MockService } from 'ng-mocks';
import { lastValueFrom, of } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authServiceMock = MockService(AuthService);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        {
          provide: AuthService,
          useValue: authServiceMock,
        }
      ],
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
  it('should be false if user is not authenticated', async () => {
    authServiceMock.checkAuthStatus = (jest.fn(() => of(false)));
    const isAuth = await lastValueFrom(authServiceMock.checkAuthStatus());
    jest.spyOn(guard, 'canActivate').mockReturnValue(isAuth);
    const res = guard.canActivate();
    expect(res).toBeFalsy();
  });
  it('should be true if user is authenticated', async () => {
    authServiceMock.checkAuthStatus = (jest.fn(() => of(true)));
    const isAuth = await lastValueFrom(authServiceMock.checkAuthStatus());
    jest.spyOn(guard, 'canActivate').mockReturnValue(isAuth);
    const res = guard.canActivate();
    expect(res).toBeTruthy();
  });
});
