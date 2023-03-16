import { Injectable } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import { UserDTO } from '../../dto/user.dto';
import { Result } from '../../models/shared/result.model';
import { User } from '../../models/user.model';
import { ApiCallService } from '../api-call/api-call.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private apiCallService: ApiCallService ) { }

  public login(userDto: UserDTO): Observable<User> {
    return this.apiCallService
      .post<User>('/users/login', userDto)
      .pipe(
      filter(res => !!res),
      map((response: any) => {
        return response;
      })
    );
  }
}
