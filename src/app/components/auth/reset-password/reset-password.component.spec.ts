import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { MockService } from 'ng-mocks';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FixNavigationTriggeredOutsideAngularZoneNgModule } from 'tests/FixNavigationTriggeredOutsideAngularZoneNgModule';

import { ResetPasswordComponent } from './reset-password.component';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let authServiceMock = MockService(AuthService);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FixNavigationTriggeredOutsideAngularZoneNgModule,
        RouterTestingModule,
      ],
      declarations: [ ResetPasswordComponent ],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceMock,
        }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPasswordComponent);
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
        const password = component.pwdResetForm.get('password');
        password?.setValue('12345678');
        expect(password?.valid).toBeFalsy();
      });
      it('should mark password valid if at least 10 char long', () => {
        const password = component.pwdResetForm.get('password');
        password?.setValue('1234567890');
        expect(password?.valid).toBeTruthy();
      });
    });

    describe('confirm password input field', () => {
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
        const password = component.pwdResetForm.get('password');
        const confirm = component.pwdResetForm.get('confirmPassword');
        password?.setValue('1234567890');
        confirm?.setValue('0912345678');
        expect(component.pwdResetForm.valid).toBeFalsy();
      });
      it('should be valid if passwords match', () => {
        const password = component.pwdResetForm.get('password');
        const confirm = component.pwdResetForm.get('confirmPassword');
        password?.setValue('1234567890');
        confirm?.setValue('1234567890');
        expect(component.pwdResetForm.valid).toBeTruthy();
      });
    });
});
