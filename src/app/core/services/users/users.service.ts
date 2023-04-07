import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDTO } from '../../dto/user.dto';
import { User } from '../../models/user.model';
import { ApiCallService } from '../api-call/api-call.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly usersUrl = '/users'

  constructor(private apiCallService: ApiCallService) { }

  findAll(): Observable<User[]> {
    return this.apiCallService.get<User[]>(this.usersUrl);
  }

  findOneByEmail(email: string): Observable<User> {
    return this.apiCallService.get<User>(`${this.usersUrl}?email=${email}`)
  }

  findOneById(id: string): Observable<User> {
    return this.apiCallService.get<User>(`${this.usersUrl}/${id}`)
  }

  update(userDto: UserDTO, id: string): Observable<User> {
    return this.apiCallService.patch<User>(`${this.usersUrl}/${id}`, userDto)
  }

  delete(id: string): Observable<any> {
    return this.apiCallService.delete<User>(`${this.usersUrl}/${id}`)
  }
}
