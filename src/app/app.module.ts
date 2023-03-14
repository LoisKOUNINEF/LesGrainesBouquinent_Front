import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedComponentsModule } from './shared/components/shared-components.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SharedComponentsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ 
    Location,
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
