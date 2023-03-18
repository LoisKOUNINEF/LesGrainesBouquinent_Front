import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  auth: any;  
  subscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
      this.auth = this.authService;
  }

  logout(): void {
    this.subscription = this.authService.logout()
      .subscribe(() => this.router.navigate(['/']));
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
