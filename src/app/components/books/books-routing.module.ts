import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BooksListComponent } from './books-list/books-list.component';
import { CreateBookComponent } from './create-book/create-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';



const booksRoutes: Routes = [
  { path: 'books', children:
    [
      {
        path: '',
        component: BooksListComponent,
      },
      {
        path:':id',
        component: BookDetailsComponent,
      },
      {
        path: 'add',
        component: CreateBookComponent,
      },
      {
        path: 'edit/:id',
        component: EditBookComponent,
      },
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(booksRoutes)
  ],
  exports: [RouterModule],
})
export class BooksRoutingModule { }
