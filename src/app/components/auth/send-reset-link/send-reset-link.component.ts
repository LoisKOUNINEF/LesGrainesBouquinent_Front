import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { UserDTO, UserFormValue } from 'src/app/core/dto/user.dto';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-send-reset-link',
  templateUrl: './send-reset-link.component.html',
  styleUrls: ['./send-reset-link.component.css']
})
export class SendResetLinkComponent {

  subscription: Subscription = new Subscription;

  pwdResetLinkForm = this.formBuilder.group({
    email: new FormControl('',[
      Validators.required,
      Validators.email
    ])
  });

  controls = {
    email: this.pwdResetLinkForm.get('email'),
  }

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() { }

  sendPwdResetLink(): Subscription | Promise<boolean> {
    if (!this.pwdResetLinkForm.valid) {
      return this.router.navigate(['auth/reset-password']);
    };
    const user = new UserDTO(this.pwdResetLinkForm.value as UserFormValue);

    return this.subscription = this.authService.sendPwdResetLink(user)
      .pipe(filter(res => !!res))
      .subscribe(() => {
        this.router.navigate(['auth/reset-link-sent']);
      }
    )
  }

  ngOnDestroy() {
    if(this.subscription) this.subscription.unsubscribe();
  }

}
