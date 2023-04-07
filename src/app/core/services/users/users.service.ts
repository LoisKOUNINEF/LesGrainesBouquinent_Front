import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { ApiCallService } from '../api-call/api-call.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly usersUrl = '/users'

  constructor(private apiCallService: ApiCallService) { }

  findAll(): Observable<User[]> {
    return this.apiCallService.get(this.usersUrl);
  }
}
