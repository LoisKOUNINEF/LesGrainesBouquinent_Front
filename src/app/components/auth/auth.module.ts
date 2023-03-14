import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { ResetLinkSentComponent } from './reset-link-sent/reset-link-sent.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SendResetLinkComponent } from './send-reset-link/send-reset-link.component';
import { SignupComponent } from './signup/signup.component';
import { SharedModulesModule } from 'src/app/shared/modules/shared-modules.module';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModulesModule } from 'src/app/shared/modules/forms-modules.module';



@NgModule({
  declarations: [
    LoginComponent,
    ResetLinkSentComponent,
    ResetPasswordComponent,
    SendResetLinkComponent,
    SignupComponent
  ],
  imports: [
    SharedModulesModule,
    FormsModulesModule,
    AuthRoutingModule,
  ]
})
export class AuthModule { }
