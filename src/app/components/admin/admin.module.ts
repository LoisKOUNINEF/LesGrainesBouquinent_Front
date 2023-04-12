import { NgModule } from '@angular/core';
import { SharedModulesModule } from 'src/app/shared/modules/shared-modules.module';
import { AdminRoutingModule } from './admin-routing.module';



@NgModule({
  declarations: [],
  imports: [
    SharedModulesModule,
    AdminRoutingModule,
  ]
})
export class AdminModule { }
