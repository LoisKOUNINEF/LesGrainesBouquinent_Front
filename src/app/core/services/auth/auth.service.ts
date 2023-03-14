import { Injectable } from '@angular/core';
import { ApiCallService } from '../api-call/api-call.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private apiCallService: ApiCallService ) { }
}
