import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { UserDTO, UserFormValue } from 'src/app/core/dto/user.dto';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { checkPasswords } from 'src/app/shared/helpers/check-passwords';
import { revealPassword } from 'src/app/shared/helpers/reveal-password';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  auth: any;
  subscription: Subscription = new Subscription;
  revealPassword = revealPassword;
  checkPasswords = checkPasswords;

  signupForm = this.formBuilder.group({
    name: new FormControl('',[
      Validators.required,
      Validators.minLength(4)
    ]),
    email: new FormControl('',[
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('',[
      Validators.minLength(10)
    ]),
    confirmPassword: [''],
    }, 
    { 
      validators: this.checkPasswords,
    }
  );

  controls = {
    name: this.signupForm.get('name'),
    email: this.signupForm.get('email'),
    password: this.signupForm.get('password'),
    confirmPassword: this.signupForm.get('confirmPassword')
  }

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() { this.auth = this.authService }

  signup(): Subscription | Promise<boolean> {
    if (!this.signupForm.valid) {
      return this.router.navigate(['auth/signup']);
    }; 

    const user = new UserDTO(this.signupForm.value as UserFormValue);

    return this.subscription = this.auth.signup(user)
      .pipe(filter(res => !!res))
      .subscribe((res: User) => {
        this.authService.login(user)
        .subscribe(() => {
          this.router.navigate(['books'])
      }) 
    })
  }

  goToLogin() {
    this.router.navigate(['auth/login']);
  }

  ngOnDestroy() {
    if(this.subscription) this.subscription.unsubscribe();
  }
  
}