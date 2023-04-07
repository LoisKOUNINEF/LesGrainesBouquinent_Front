import { TestBed } from '@angular/core/testing';
import { MockService } from 'ng-mocks';
import { lastValueFrom, of } from 'rxjs';
import { SharedModulesModule } from 'src/app/shared/modules/shared-modules.module';
import { UserStub } from 'tests/stub-dto/user.stub';
import { User } from '../../models/user.model';
import { ApiCallService } from '../api-call/api-call.service';

import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let apiCallServiceMock = MockService(ApiCallService);

  const userDto = new UserStub;
  const users = [
    {
      name: 'lolo', 
      email: 'lolo@yopmail.com',
    },
    {
      name: 'lolo2', 
      email: 'lolo2@yopmail.com',
    }
  ];
  const usersUrl = '/users';

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
    service = TestBed.inject(UsersService);
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
    it('should call ApiCallService get request', async () => {
      apiCallServiceMock.get = (jest.fn(() => of(users as User[]))) as any;
      const usersList = await lastValueFrom(service.findAll());      
      expect(apiCallServiceMock.get).toHaveBeenCalled();
      expect(apiCallServiceMock.get).toHaveBeenCalledWith(usersUrl);
      expect(usersList.length).toBe(2);
      expect(usersList[0].name).toBe('lolo');
    });
  });
});
