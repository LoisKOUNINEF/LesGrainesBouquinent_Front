import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { UserDTO, UserFormValue } from 'src/app/core/dto/user.dto';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { checkPasswords } from 'src/app/shared/helpers/check-passwords';
import { revealPassword } from 'src/app/shared/helpers/reveal-password';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  token: string = '';
  subscription: Subscription = new Subscription;
  revealPassword = revealPassword;
  checkPasswords = checkPasswords;

  pwdResetForm = this.formBuilder.group({
    password: new FormControl('',[
      Validators.minLength(10)
    ]),
    confirmPassword: [''],
  }, 
  { 
    validators: this.checkPasswords,
  });

  controls = {
    password: this.pwdResetForm.get('password'),
    confirmPassword: this.pwdResetForm.get('confirm-password'),
  }

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() { this.token = this.route.snapshot.params['token'] }

  resetPwd(): Subscription | Promise<boolean> {
    if (!this.pwdResetForm.valid) {
      return this.router.navigate([`auth/reset-password/${this.token}`]);
    };
    const user = new UserDTO(this.pwdResetForm.value as UserFormValue);
      
    return this.subscription = this.authService.resetPwd(user, this.token)
      .pipe(filter(res => !!res))
      .subscribe(() => {
        this.router.navigate(['auth/login'])
      }
    )
  }

  ngOnDestroy() {
    if(this.subscription) this.subscription.unsubscribe();
  }
  
}