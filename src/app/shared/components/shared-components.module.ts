import { NgModule } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SharedModulesModule } from '../modules/shared-modules.module';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    NotFoundComponent
  ],
  imports: [
    SharedModulesModule,
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    NotFoundComponent,
  ],
})
export class SharedComponentsModule { }
