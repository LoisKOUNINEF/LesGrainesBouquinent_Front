import { NgModule } from '@angular/core';
import { SharedModulesModule } from 'src/app/shared/modules/shared-modules.module';
import { AdminRoutingModule } from './admin-routing.module';
import { ManageBooksComponent } from './manage-books/manage-books.component';
import { ManageCommentsComponent } from './manage-comments/manage-comments.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';



@NgModule({
  declarations: [
    ManageBooksComponent,
    ManageCommentsComponent,
    ManageUsersComponent
  ],
  imports: [
    SharedModulesModule,
    AdminRoutingModule,
  ]
})
export class AdminModule { }
