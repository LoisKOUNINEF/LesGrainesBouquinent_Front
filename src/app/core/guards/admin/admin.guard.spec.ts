import { TestBed } from '@angular/core/testing';
import { MockService } from 'ng-mocks';
import { lastValueFrom, of } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

import { AdminGuard } from './admin.guard';

describe('AdminGuard', () => {
  let guard: AdminGuard;
  let authServiceMock = MockService(AuthService);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: authServiceMock,
        }
      ],
    });
    guard = TestBed.inject(AdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
  it('should be false if user is not admin', async () => {
    authServiceMock.checkIfAdmin = (jest.fn(() => of(false)));
    const isAdmin = await lastValueFrom(authServiceMock.checkIfAdmin());
    jest.spyOn(guard, 'canActivate').mockReturnValue(isAdmin);
    const res = guard.canActivate();
    expect(res).toBeFalsy();
  });
  it('should be true if user is admin', async () => {
    authServiceMock.checkIfAdmin = (jest.fn(() => of(true)));
    const isAdmin = await lastValueFrom(authServiceMock.checkIfAdmin());
    jest.spyOn(guard, 'canActivate').mockReturnValue(isAdmin);
    const res = guard.canActivate();
    expect(res).toBeTruthy();
  });
});
