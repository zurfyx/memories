import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserListComponent } from './list/user-list.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'users', component: UserListComponent },
    ])
  ]
})
export class UserRoutingModule { }
