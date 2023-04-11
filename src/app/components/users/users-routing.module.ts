import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserDetailsComponent } from './user-details/user-details.component';



const usersRoutes: Routes = [
  { path: 'users', children: [
      {
        path: '',
        component: UsersListComponent,
      },
      {
        path: 'edit/:id',
        component: EditUserComponent,
      },
      {
        path: ':id',
        component: UserDetailsComponent,
      },
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(usersRoutes)
  ],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
