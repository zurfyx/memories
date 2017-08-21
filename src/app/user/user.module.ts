import { NgModule } from '@angular/core';
import { MdCardModule } from '@angular/material';

import { SharedModule } from '../shared';
import { UserResolver } from './user-resolver.service';
import { UserListComponent } from './list/user-list.component';
import { UserDetailComponent } from './detail/user-detail.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  imports: [
    MdCardModule,
    SharedModule,
    UserRoutingModule,
  ],
  exports: [],
  declarations: [
    UserListComponent,
    UserDetailComponent,
  ],
  providers: [
    SharedModule,
    UserResolver,
  ],
})
export class UserModule { }
