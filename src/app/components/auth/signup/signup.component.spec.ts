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
      expect(router.navigate).toHaveBeenCalledWith(['signup']);
    });
    // it('should redirect to books page', async () => {
    //   jest.spyOn(router, 'navigate');

    //   component.signup();
    //   expect(router.navigate).toHaveBeenCalledWith(['books']);
    // });
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
