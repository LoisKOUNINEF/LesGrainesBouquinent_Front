import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiCallService } from './services/api-call/api-call.service';
import { ENV, getEnv } from 'src/environments/environments.provider';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ApiCallService,
    {
      provide: ENV, 
      useFactory: getEnv
    },
  ],
})
export class CoreModule { }
