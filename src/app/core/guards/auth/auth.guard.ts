import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  subscription: Subscription = new Subscription;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise((resolve) => {
      this.subscription = this.authService.checkAuthStatus().subscribe(res => {
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