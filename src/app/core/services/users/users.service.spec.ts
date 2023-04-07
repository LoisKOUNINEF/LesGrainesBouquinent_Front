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
      id: 'randomString1',
      name: 'lolo', 
      email: 'lolo@yopmail.com',
    },
    {
      id: 'randomString2',
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

  describe('findOneByEmail method', () => {
    it('should have a findOneByEmail method', () => {
      expect(service.findOneByEmail).toBeDefined();
      expect(service.findOneByEmail).toBeInstanceOf(Function);
    });
    it('should call ApiCallService get method', async () => {
      apiCallServiceMock.get = (jest.fn(() => of(users[0] as User))) as any;
      const user = await lastValueFrom(service.findOneByEmail(users[0].email));
      expect(apiCallServiceMock.get).toHaveBeenCalled();
      expect(apiCallServiceMock.get).toHaveBeenCalledWith(`${usersUrl}?email=${users[0].email}`);
      expect(user.name).toBe(users[0].name)
    });
  });

  describe('findOneById method', () => {
    it('should have a findOneById method', () => {
      expect(service.findOneById).toBeDefined();
      expect(service.findOneById).toBeInstanceOf(Function);
    });
    it('should call ApiCallService get method', async () => {
      apiCallServiceMock.get = (jest.fn(() => of(users[0] as User))) as any;
      const user = await lastValueFrom(service.findOneById(users[0].id));
      expect(apiCallServiceMock.get).toHaveBeenCalled();
      expect(apiCallServiceMock.get).toHaveBeenCalledWith(`${usersUrl}/${users[0].id}`);
      expect(user.name).toBe(users[0].name)
    });
  });
});
