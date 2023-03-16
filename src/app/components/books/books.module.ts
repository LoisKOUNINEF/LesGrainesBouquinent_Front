import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateBookComponent } from './create-book/create-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { BookFormComponent } from './book-form/book-form.component';
import { BooksListComponent } from './books-list/books-list.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BooksSearchbarComponent } from './books-searchbar/books-searchbar.component';



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
    CommonModule
  ]
})
export class BooksModule { }
