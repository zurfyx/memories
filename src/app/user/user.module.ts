import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  MdCardModule,
} from '@angular/material';

import { UserResolver } from './user-resolver.service';
import { UserListComponent } from './list/user-list.component';
import { UserDetailComponent } from './detail/user-detail.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MdCardModule,
    UserRoutingModule,
  ],
  exports: [],
  declarations: [
    UserListComponent,
    UserDetailComponent,
  ],
  providers: [
    UserResolver,
  ],
})
export class UserModule { }
