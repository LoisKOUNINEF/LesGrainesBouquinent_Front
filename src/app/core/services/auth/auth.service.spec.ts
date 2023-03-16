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
  }

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
      expect(service.login).toBeInstanceOf(Function)
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
      expect(service.signup).toBeInstanceOf(Function)
    });
    it('should call ApiCallService post request', async () => {
      apiCallServiceMock.post = (jest.fn(() => of(userDto as User))) as any;
      const signedUp = await lastValueFrom(service.signup(userDto));
      expect(signedUp.name).toBe("lolo");
      expect(signedUp.email).toBe("lolo@yopmail.com");
      expect(apiCallServiceMock.post).toHaveBeenCalled();
    });
  });
});
