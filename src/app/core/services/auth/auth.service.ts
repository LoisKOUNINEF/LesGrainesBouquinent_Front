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
        if(response.isAdmin) {
          this.isAdmin = true;
        }
        this.isAuth = true;
        return response;
      })
    );
  }

  public signup(userDto: UserDTO): Observable<User> {
    return this.apiCallService
    .post(this.usersUrl, userDto);
  }

  public logout(): Observable<any> {
    return this.apiCallService
    .post(this.logoutUrl)
    .pipe(
      filter(res => !!res),
      map((response: any) => {
        this.isAdmin = false;
        this.isAuth = false;
        return response;
      })
    )
  }

  public checkAuthStatus(): Observable<boolean> {
    return this.apiCallService
    .get(this.checkAuthUrl)
    .pipe(
      filter(res => !!res),
      map((response: any) => {
        this.isAuth = response;
        return response;
      })
    );
  }

  public checkIfAdmin(): Observable<Result<boolean>> {
    return this.apiCallService
    .get(this.checkAdminUrl)
    .pipe(
      filter(res => !!res),
      map((response: any) => {
        this.isAdmin = response;
        return response;
      })
    );
  }

  public sendPwdResetLink(userDto: UserDTO): Observable<any> {
    return this.apiCallService
    .post(this.pwdResetUrl, userDto);
  }

  public resetPwd(userDto: UserDTO, token: string) {
    return this.apiCallService
    .post(`${this.pwdResetUrl}${token}`, userDto);
  }
}
