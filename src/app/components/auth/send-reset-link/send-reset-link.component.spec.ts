import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MockService } from 'ng-mocks';
import { lastValueFrom, of } from 'rxjs';
import { UserDTO } from 'src/app/core/dto/user.dto';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FixNavigationTriggeredOutsideAngularZoneNgModule } from 'tests/FixNavigationTriggeredOutsideAngularZoneNgModule';
import { UserStub } from 'tests/stub-dto/user.stub';

import { SendResetLinkComponent } from './send-reset-link.component';

describe('SendResetLinkComponent', () => {
  let component: SendResetLinkComponent;
  let fixture: ComponentFixture<SendResetLinkComponent>;
  let authServiceMock = MockService(AuthService);
  let router: Router;
  const userDto = new UserStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FixNavigationTriggeredOutsideAngularZoneNgModule,
      ],
      declarations: [ SendResetLinkComponent ],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceMock,
        }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendResetLinkComponent);
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

  describe('sendPwdResetLink method', () => {
    authServiceMock.sendPwdResetLink = (jest.fn(() => of(userDto as UserDTO))) as any;

    it('should have a sendPwdResetLink method', () => {
      expect(component.sendPwdResetLink).toBeDefined();
      expect(component.sendPwdResetLink).toBeInstanceOf(Function);
    });
    it('should call Auth Service sendPwdResetLink method', async () => {
      await lastValueFrom(authServiceMock.sendPwdResetLink(userDto));
      expect(authServiceMock.sendPwdResetLink).toHaveBeenCalled();
    });
    it('should redirect to login page', () => {
      jest.spyOn(router, 'navigate');
      component.sendPwdResetLink();
      expect(router.navigate).toHaveBeenCalledWith(['auth/reset-password']);
    });
  });
});
