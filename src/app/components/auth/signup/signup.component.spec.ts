import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MockService } from 'ng-mocks';
import { lastValueFrom, of } from 'rxjs';
import { UserDTO } from 'src/app/core/dto/user.dto';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FixNavigationTriggeredOutsideAngularZoneNgModule } from 'tests/FixNavigationTriggeredOutsideAngularZoneNgModule';
import { UserStub } from 'tests/stub-dto/user.stub';

import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let authServiceMock = MockService(AuthService);
  let router: Router;
  const userDto = new UserStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FixNavigationTriggeredOutsideAngularZoneNgModule,
      ],
      declarations: [ SignupComponent ],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceMock,
        }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
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

  describe('signup method', () => {
    authServiceMock.signup = (jest.fn(() => of(userDto as UserDTO))) as any;

    it('should have a signup method', () => {
      expect(component.signup).toBeDefined();
      expect(component.signup).toBeInstanceOf(Function);
    });
    it('should call Auth Service signup method', async () => {
      await lastValueFrom(authServiceMock.signup(userDto));
      expect(authServiceMock.signup).toHaveBeenCalled();
    });
    it('should redirect to signup page', () => {
      jest.spyOn(router, 'navigate');
      component.signup();
      expect(router.navigate).toHaveBeenCalledWith(['auth/signup']);
    });

    describe('name input field', () => {
      it('shoud have an input element with class form-class for name field', () => {
        const el = fixture.debugElement.query(By.css('.form-class.name'));
        expect(el).toBeTruthy();
      });
      it('should have name form attributes', () => {
        const el = fixture.debugElement.query(By.css('.name input.form-input'))
        expect(el.nativeElement.getAttribute('type')).toEqual('text');
        expect(el.nativeElement.getAttribute('id')).toEqual('name');
        expect(el.nativeElement.getAttribute('class')).toEqual('form-input');
        expect(el.nativeElement.getAttribute('formControlName')).toEqual('name');
      });
      it('should mark name invalid if empty', () => {
        const name = component.signupForm.get('name');
        name?.setValue(null);
        expect(name?.valid).toBeFalsy();
      });
      it('should mark name invalid if less than 4 char long', () => {
        const name = component.signupForm.get('name');
        name?.setValue('12');
        expect(name?.valid).toBeFalsy();
      });
      it('should mark name valid if it is at least 4 char long', () => {
        const name = component.signupForm.get('name');
        name?.setValue('lolo');
        expect(name?.valid).toBeTruthy();
      });
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
      it('should mark email invalid if empty', () => {
        const email = component.signupForm.get('email');
        email?.setValue(null);
        expect(email?.valid).toBeFalsy();
      });
      it('should mark email invalid if not in email format', () => {
        const email = component.signupForm.get('email');
        email?.setValue('loloyopmail.com');
        expect(email?.valid).toBeFalsy();
      });
      it('should mark email valid if email format', () => {
        const email = component.signupForm.get('email');
        email?.setValue('lolo@yopmail.com');
        expect(email?.valid).toBeTruthy();
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
      it('should mark password invalid if less than 10 char long', () => {
        const password = component.signupForm.get('password');
        password?.setValue('12345678');
        expect(password?.valid).toBeFalsy();
      });
      it('should mark password valid if at least 10 char long', () => {
        const password = component.signupForm.get('password');
        password?.setValue('1234567890');
        expect(password?.valid).toBeTruthy();
      });
    });

    describe('confirm password input field', () => {
      beforeEach(() => {
        const name = component.signupForm.get('name');
        const email = component.signupForm.get('email');
        name?.setValue(userDto.name);
        email?.setValue(userDto.email);
      });
      it('shoud have an input element with class form-class for confirm field', () => {
      const el = fixture.debugElement.query(By.css('.form-class.confirm'));
      expect(el).toBeTruthy();
      });
      it('should have confirm form attributes', () => {
        const el = fixture.debugElement.query(By.css('.confirm input.form-input'))
        expect(el.nativeElement.getAttribute('type')).toEqual('password');
        expect(el.nativeElement.getAttribute('id')).toEqual('confirm');
        expect(el.nativeElement.getAttribute('class')).toEqual('form-input');
        expect(el.nativeElement.getAttribute('formControlName')).toEqual('confirmPassword');
      });
      it('should mark that passwords do not match', () => {
        const password = component.signupForm.get('password');
        const confirm = component.signupForm.get('confirmPassword');
        password?.setValue('1234567890');
        confirm?.setValue('0912345678');
        expect(component.signupForm.valid).toBeFalsy();
      });
      it('should be valid if passwords match', () => {
        const password = component.signupForm.get('password');
        const confirm = component.signupForm.get('confirmPassword');
        password?.setValue('1234567890');
        confirm?.setValue('1234567890');
        expect(component.signupForm.valid).toBeTruthy();
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
