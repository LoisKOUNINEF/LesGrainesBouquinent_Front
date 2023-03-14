import { NgModule } from '@angular/core';
import { SharedModulesModule } from './shared-modules.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  imports: [
    SharedModulesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class FormsModulesModule { }
