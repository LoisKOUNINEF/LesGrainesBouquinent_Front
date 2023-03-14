import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SendResetLinkComponent } from './send-reset-link/send-reset-link.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetLinkSentComponent } from './reset-link-sent/reset-link-sent.component';



const authRoutes: Routes = [
  { path: 'auth', children:
    [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'signup',
        component: SignupComponent,
      },
      {
        path: 'reset-password',
        component: SendResetLinkComponent,
      },
      {
        path: 'reset-password/:token',
        component: ResetPasswordComponent,
      },
      {
        path: 'reset-link-sent',
        component: ResetLinkSentComponent
      },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
