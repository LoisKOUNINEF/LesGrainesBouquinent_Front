import { NgModule } from '@angular/core';
import { ApiCallService } from './services/api-call/api-call.service';
import { ENV, getEnv } from 'src/environments/environments.provider';
import { SharedModulesModule } from '../shared/modules/shared-modules.module';

@NgModule({
  declarations: [],
  imports: [
    SharedModulesModule,
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
