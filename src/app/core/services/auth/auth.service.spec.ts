import { MockService } from 'ng-mocks';
import { TestBed } from '@angular/core/testing';
import { SharedModulesModule } from 'src/app/shared/modules/shared-modules.module';
import { UserDTO } from '../../dto/user.dto';
import { ApiCallService } from '../api-call/api-call.service';

import { AuthService } from './auth.service';
import { User } from '../../models/user.model';
import { lastValueFrom, of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let apiCallServiceMock = MockService(ApiCallService);

  const userDto: UserDTO = {
    email: "lolo@yopmail.com",
    name: "lolo",
    password: "1234567890"
  };

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
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('apiCallServiceMock', () => {
    it('should be defined', () => {
      expect(apiCallServiceMock).toBeDefined();
    });
  });

  describe('login method', () => {
    it('should have a login method', () => {
      expect(service.login).toBeDefined();
      expect(service.login).toBeInstanceOf(Function);
    });
    it('should call ApiCallService post request', async () => {
      apiCallServiceMock.post = (jest.fn(() => of(userDto as User))) as any;
      const loggedIn = await lastValueFrom(service.login(userDto));
      expect(loggedIn.name).toBe("lolo");
      expect(loggedIn.email).toBe("lolo@yopmail.com");
      expect(apiCallServiceMock.post).toHaveBeenCalled();
    })
  });

  describe('signup method', () => {
    it('should have a signup method', () => {
      expect(service.signup).toBeDefined();
      expect(service.signup).toBeInstanceOf(Function);
    });
    it('should call ApiCallService post request', async () => {
      apiCallServiceMock.post = (jest.fn(() => of(userDto as User))) as any;
      const signedUp = await lastValueFrom(service.signup(userDto));
      expect(signedUp.name).toBe("lolo");
      expect(signedUp.email).toBe("lolo@yopmail.com");
      expect(apiCallServiceMock.post).toHaveBeenCalled();
    });
  });

  describe('logout method', () => {
    it('should have a logout method', () => {
      expect(service.logout).toBeDefined();
      expect(service.logout).toBeInstanceOf(Function);
    });
    it('should call ApiCallService post request', async () => {
      const msg = 'logged out';
      apiCallServiceMock.post = (jest.fn(() => of(msg))) as any;
      const loggedOut = await lastValueFrom(service.logout());
      expect(loggedOut).toBe('logged out');
      expect(apiCallServiceMock.post).toHaveBeenCalled();
    });
  });

  describe('check auth status', () => {
    const status: boolean = true;
    apiCallServiceMock.get = (jest.fn(() => of(status as  boolean))) as any;
    
    it('should have a checkAuthStatus method', () => {
      expect(service.checkAuthStatus).toBeDefined();
      expect(service.checkAuthStatus).toBeInstanceOf(Function);
    });
    it('should call ApiCallService get request', async () => {
      service.checkAuthStatus();
      expect(apiCallServiceMock.get).toHaveBeenCalled();
    });
    it('should return true', async () => {
      const isAuth = await lastValueFrom(service.checkAuthStatus())
      expect(isAuth).toBe(true)
    });
  });

  describe('check admin status', () => {
    const status: boolean = true;
    apiCallServiceMock.get = (jest.fn(() => of(status as  boolean))) as any;

    it('should have a checkifAdmin method', () => {
      expect(service.checkIfAdmin).toBeDefined();
      expect(service.checkIfAdmin).toBeInstanceOf(Function);
    });
    it('should call ApiCallService get request', () => {
      service.checkIfAdmin()
      expect(apiCallServiceMock.get).toHaveBeenCalled();
    });
    it('should return true', async () => {
      const isAdmin = await lastValueFrom(service.checkIfAdmin())
      expect(isAdmin).toBe(true)
    });
  });

  describe('send password reset link method', () => {
    it('should have a sendPwdResetLink method', () => {
      expect(service.sendPwdResetLink).toBeDefined();
      expect(service.sendPwdResetLink).toBeInstanceOf(Function);
    });
    it('should call ApiCallService post request', async () => {
      apiCallServiceMock.post = (jest.fn(() => of(userDto as User))) as any;
      service.sendPwdResetLink(userDto);
      expect(apiCallServiceMock.post).toHaveBeenCalled();
    })
  });

  describe('reset password method', () => {
    it('should have a resetPwd method', () => {
      expect(service.resetPwd).toBeDefined();
      expect(service.resetPwd).toBeInstanceOf(Function);
    });
    it('should call ApiCallService post request', async () => {
      const token = 'token';
      apiCallServiceMock.post = (jest.fn(() => of(userDto as User))) as any;
      service.resetPwd(userDto, token);
      expect(apiCallServiceMock.post).toHaveBeenCalled();
    })
  });
});
