import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './components/auth/auth.module';
import { BooksModule } from './components/books/books.module';
import { UsersModule } from './components/users/users.module';
import { CoreModule } from './core/core.module';
import { SharedComponentsModule } from './shared/components/shared-components.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedComponentsModule,
    CoreModule,
    AuthModule,
    BooksModule,
    UsersModule,
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
