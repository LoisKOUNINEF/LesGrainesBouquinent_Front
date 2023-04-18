import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/core/guards/admin/admin.guard';
import { ManageBooksComponent } from './manage-books/manage-books.component';
import { ManageCommentsComponent } from './manage-comments/manage-comments.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';



const adminRoutes: Routes = [
  { path: 'admin', canActivate: [AdminGuard], children: [
      {
        path: 'manage-users', 
        component: ManageUsersComponent,
      },
      {
        path: 'manage-books',
        component: ManageBooksComponent,
      },
      {
        path: 'manage-comments/:bookid',
        component: ManageCommentsComponent,
      }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
