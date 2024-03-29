import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MockService } from 'ng-mocks';
import { lastValueFrom, of } from 'rxjs';
import { UserDTO } from 'src/app/core/dto/user.dto';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FixNavigationTriggeredOutsideAngularZoneNgModule } from 'tests/FixNavigationTriggeredOutsideAngularZoneNgModule';
import { UserStub } from 'tests/stub-dto/user.stub';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceMock = MockService(AuthService);
  let router: Router;
  const userDto = new UserStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FixNavigationTriggeredOutsideAngularZoneNgModule,
      ],
      declarations: [ LoginComponent ],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceMock,
        }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
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

  describe('login method', () => {
    authServiceMock.login = (jest.fn(() => of(userDto as UserDTO))) as any;

    it('should have a login method', () => {
      expect(component.login).toBeDefined();
      expect(component.login).toBeInstanceOf(Function);
    });
    it('should call Auth Service login method', async () => {
      await lastValueFrom(authServiceMock.login(userDto));
      expect(authServiceMock.login).toHaveBeenCalled();
    });

    it('should redirect to login page', () => {
      jest.spyOn(router, 'navigate');
      component.login();
      expect(router.navigate).toHaveBeenCalledWith(['auth/login']);
    });
    
    describe('email input field', () => {
      it('shoud have an input element with class form-class for email field', () => {
      const el = fixture.debugElement.query(By.css('.form-class.email'));
      expect(el).toBeTruthy();
      });
      it('should have email form attributes', () => {
        const el = fixture.debugElement.query(By.css('.email input.form-input'))
        expect(el.nativeElement.getAttribute('type')).toEqual('email');
        expect(el.nativeElement.getAttribute('id')).toEqual('email');
        expect(el.nativeElement.getAttribute('class')).toEqual('form-input');
        expect(el.nativeElement.getAttribute('formControlName')).toEqual('email');
      });
    });

    describe('password input field', () => {
      it('shoud have an input element with class form-class for password field', () => {
      const el = fixture.debugElement.query(By.css('.form-class.password'));
      expect(el).toBeTruthy();
      });
      it('should have password form attributes', () => {
        const el = fixture.debugElement.query(By.css('.password input.form-input'))
        expect(el.nativeElement.getAttribute('type')).toEqual('password');
        expect(el.nativeElement.getAttribute('id')).toEqual('password');
        expect(el.nativeElement.getAttribute('class')).toEqual('form-input');
        expect(el.nativeElement.getAttribute('formControlName')).toEqual('password');
      });
    });

    describe('submit button', () => {
      it('shoud have a submit button', () => {
      const el = fixture.debugElement.query(By.css('.form-class.submit'));
      expect(el).toBeTruthy();
      });
      it('should have submit button attributes', () => {
        const el = fixture.debugElement.query(By.css('.submit button.submit'))
        expect(el.nativeElement.getAttribute('type')).toEqual('submit');
        expect(el.nativeElement.getAttribute('class')).toEqual('submit');
      });
    });
  });
});
