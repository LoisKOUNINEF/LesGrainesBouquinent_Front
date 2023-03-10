import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";
import { ENV } from "src/environments/environments.provider";
import { Environment } from "src/environments/ienvironment";

@Injectable({ providedIn: 'root'})
export class ApiCallService {

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true
  };

  constructor(
    @Inject(ENV) private env: Environment,
    private http: HttpClient, 
    ) { }

  private formatErrors(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }

  get<T>(path: string): Observable<T> {
    return this.http
    .get<T>(`${this.env.apiUrl}${path}`, 
      this.httpOptions)
      .pipe(catchError((error) => this.formatErrors(error, null)));
  }

  patch<T>(path: string, body: Object = {}): Observable<T> {
    return this.http
    .patch<T>(`${this.env.apiUrl}${path}`,
      JSON.stringify(body),
      this.httpOptions)
      .pipe(catchError((error) => this.formatErrors(error, null)));
  }


  post<T>(path: string, body: Object = {}): Observable<T> {
    return this.http
    .post<T>(`${this.env.apiUrl}${path}`,
      JSON.stringify(body),
      this.httpOptions)
      .pipe(catchError((error) => this.formatErrors(error, null)));
  }

  delete<T>(path: string): Observable<T> {
    return this.http
    .delete<T>(`${this.env.apiUrl}${path}`, 
      this.httpOptions)
      .pipe(catchError((error) => this.formatErrors(error, null)));
  }

}