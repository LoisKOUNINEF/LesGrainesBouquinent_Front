import { MockService } from 'ng-mocks';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from 'src/app/core/services/auth/auth.service';

import { NavbarComponent } from './navbar.component';
import { Router } from '@angular/router';
import { lastValueFrom, of } from 'rxjs';
import { FixNavigationTriggeredOutsideAngularZoneNgModule } from 'tests/FixNavigationTriggeredOutsideAngularZoneNgModule';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authServiceMock = MockService(AuthService);
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FixNavigationTriggeredOutsideAngularZoneNgModule],
      declarations: [ NavbarComponent ],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceMock,
        }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('authServiceMock', () => {
    it('should be defined', () => {
      expect(authServiceMock).toBeDefined();
    });
  });

  describe('logout method', () => {
    authServiceMock.logout = (jest.fn(() => of(null)));

    it('should have a logout method', () => {
      expect(component.logout).toBeDefined();
      expect(component.logout).toBeInstanceOf(Function);
    });
    it('should call Auth Service logout method', async () => {
      await lastValueFrom(authServiceMock.logout());
      expect(authServiceMock.logout).toHaveBeenCalled();
    });
    it('should redirect to home page', () => {
      jest.spyOn(router, 'navigate');
      component.logout();
      expect(router.navigate).toHaveBeenCalledWith(['/']);
    });
  });
});
