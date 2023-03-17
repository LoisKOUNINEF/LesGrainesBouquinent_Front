import { MockService } from 'ng-mocks';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AuthService } from './core/services/auth/auth.service';
import { SharedComponentsModule } from './shared/components/shared-components.module';
import { lastValueFrom, of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let authServiceMock = MockService(AuthService);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedComponentsModule,
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
    expect(authServiceMock).toBeDefined();
  });

  it(`should have as title 'Les Graines Bouquinent'`, () => {
    expect(component.title).toEqual('Les Graines Bouquinent');
  });

  it('should have a navbar component', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-navbar')).toBeTruthy();
  });

  it('should have a footer component', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-footer')).toBeTruthy();
  });

  it('should check users auth status', async () => {
    const status: boolean = true;
    authServiceMock.checkAuthStatus = (jest.fn(() => of(status as boolean))) as any;
    const isAuth = await lastValueFrom(authServiceMock.checkAuthStatus());
    
    expect(authServiceMock.checkAuthStatus).toHaveBeenCalled();
    expect(isAuth).toBe(true);
  });

  it('should check users admin status', async () => {
    const status: boolean = true;
    authServiceMock.checkIfAdmin = (jest.fn(() => of(status as boolean))) as any;
    const isAdmin = await lastValueFrom(authServiceMock.checkIfAdmin());
    
    expect(authServiceMock.checkIfAdmin).toHaveBeenCalled();
    expect(isAdmin).toBe(true);
  });

});
