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
  private readonly usersUrl = '/users';
  private readonly authUrl = '/auth';
  private readonly pwdResetUrl = '/forgot-password/';
  private readonly loginUrl = this.usersUrl + '/login';
  private readonly logoutUrl = this.usersUrl + '/logout';
  private readonly checkAuthUrl = this.authUrl + '/auth';
  private readonly checkAdminUrl = this.authUrl + '/admin';
  
  public isAuth: boolean = false;
  public isAdmin: boolean = false;

  constructor( private apiCallService: ApiCallService ) { }

  public login(userDto: UserDTO): Observable<User> {
    return this.apiCallService
      .post<User>(this.loginUrl, userDto)
      .pipe(
      filter(res => !!res),
      map((response: any) => {
        return response;
      })
    );
  }

  public signup(userDto: UserDTO): Observable<User> {
    return this.apiCallService
    .post(this.usersUrl, userDto);
  }
}
