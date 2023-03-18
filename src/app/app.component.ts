import { Component } from '@angular/core';
import { Router, NavigationCancel, NavigationEnd } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { filter } from 'rxjs/operators';
import { AuthService } from './core/services/auth/auth.service';
import { Subscription } from 'rxjs';
declare let $: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [
        Location, {
            provide: LocationStrategy,
            useClass: PathLocationStrategy
        }
    ]
})
export class AppComponent {
    title = 'Les Graines Bouquinent';

    location: any;
    routerSubscription: Subscription = new Subscription;
    adminSubscription: Subscription = new Subscription;
    authSubscription: Subscription = new Subscription;
    subscriptions: Subscription[] = [];

    constructor(
        private router: Router,
        private authService: AuthService,
        ) {}

    ngOnInit(){
        this.recallJsFuntions();
        this.checkUserStatus();
    }

    recallJsFuntions() {
        this.routerSubscription = this.router.events
        .pipe(filter(event => event instanceof NavigationEnd || event instanceof NavigationCancel))
        .subscribe(event => {
            this.location = this.router.url;
            if (!(event instanceof NavigationEnd)) {
                return;
            }
            this.subscriptions.push(this.routerSubscription);
            window.scrollTo(0, 0);
        });
    }

    checkUserStatus() {
      this.authSubscription = 
        this.authService.checkAuthStatus().subscribe();
      this.adminSubscription =
        this.authService.checkIfAdmin().subscribe();
      this.subscriptions.push(this.adminSubscription, this.authSubscription);
    }

    ngOnDestroy() {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe);
    }
    
}