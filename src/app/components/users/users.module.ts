import { NgModule } from '@angular/core';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { SharedModulesModule } from 'src/app/shared/modules/shared-modules.module';
import { UsersRoutingModule } from './users-routing.module';



@NgModule({
  declarations: [
    EditUserComponent,
    UsersListComponent,
    UserDetailsComponent
  ],
  imports: [
    SharedModulesModule,
    UsersRoutingModule,
  ]
})
export class UsersModule { }
