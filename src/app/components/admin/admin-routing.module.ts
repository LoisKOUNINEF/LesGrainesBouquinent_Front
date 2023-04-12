import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/core/guards/admin/admin.guard';
import { UsersListComponent } from '../users/users-list/users-list.component';



const adminRoutes: Routes = [
  { path: 'admin', canActivate: [AdminGuard], children: [
      {
        path: 'users-list', 
        component: UsersListComponent},
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
