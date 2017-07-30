import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  MdCardModule,
} from '@angular/material';

import { UserListComponent } from './list/user-list.component';
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
  ],
  providers: [],
})
export class UserModule { }
