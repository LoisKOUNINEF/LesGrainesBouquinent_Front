import { NgModule } from '@angular/core';
import { CreateBookComponent } from './create-book/create-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { BookFormComponent } from './book-form/book-form.component';
import { BooksListComponent } from './books-list/books-list.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BooksSearchbarComponent } from './books-searchbar/books-searchbar.component';
import { SharedModulesModule } from 'src/app/shared/modules/shared-modules.module';
import { FormsModulesModule } from 'src/app/shared/modules/forms-modules.module';
import { BooksRoutingModule } from './books-routing.module';



@NgModule({
  declarations: [
    CreateBookComponent,
    EditBookComponent,
    BookFormComponent,
    BooksListComponent,
    BookDetailsComponent,
    BooksSearchbarComponent
  ],
  imports: [
    SharedModulesModule,
    FormsModulesModule,
    BooksRoutingModule,
  ]
})
export class BooksModule { }
