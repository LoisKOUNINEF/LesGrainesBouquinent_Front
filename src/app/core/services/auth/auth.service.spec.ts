import { MockService } from 'ng-mocks';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { SharedModulesModule } from 'src/app/shared/modules/shared-modules.module';
import { UserDTO } from '../../dto/user.dto';
import { ApiCallService } from '../api-call/api-call.service';

import { AuthService } from './auth.service';
import { User } from '../../models/user.model';
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let apiCallServiceMock = MockService(ApiCallService);

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

  describe('login request', () => {
    it('should have a login request', () => {
      expect(service.login).toBeDefined();
      expect(service.login).toBeInstanceOf(Function)
    });
    it('should call ApiCallService post request', async () => {
      const userDto: UserDTO = {
        email: "lolo@yopmail.com",
        name: "lolo",
        password: "1234567890"
      }
      apiCallServiceMock.post = (jest.fn(() => of(userDto as User))) as any;
      const loggedIn = await service.login(userDto).toPromise();
      expect(loggedIn!.name).toBe("lolo");
      expect(loggedIn!.email).toBe("lolo@yopmail.com");
      expect(apiCallServiceMock.post).toHaveBeenCalled();
      expect(apiCallServiceMock).toBeDefined()
    })
  });
});
