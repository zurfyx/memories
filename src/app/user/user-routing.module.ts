import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserResolver } from './user-resolver.service';
import { UserListComponent } from './list/user-list.component';
import { UserDetailComponent } from './detail/user-detail.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: UserListComponent },
      {
        path: ':uid',
        component: UserDetailComponent,
        resolve: {
          user: UserResolver,
        }
      }
    ])
  ]
})
export class UserRoutingModule { }
