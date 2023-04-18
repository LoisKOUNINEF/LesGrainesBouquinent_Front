
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  subscription: Subscription = new Subscription;
  
  constructor( 
    private router: Router, 
    private authService: AuthService
  ) {}

  canActivate(): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise((resolve) => {
      this.subscription = this.authService.isAdmin
      .subscribe(res => {
        if(res) {
          resolve(true);
        } else {
          this.router.navigate(['auth/login']);
          resolve(false);
        }
        this.subscription.unsubscribe();
      })
    })
  }
}