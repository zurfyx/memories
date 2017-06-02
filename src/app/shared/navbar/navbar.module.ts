import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdButtonModule,
  MdToolbarModule,
} from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth';

import { NavbarComponent } from './navbar.component';
import { SigninComponent } from './signin.component';

@NgModule({
  imports: [
    MdButtonModule,
    MdToolbarModule,
    CommonModule,
  ],
  exports: [NavbarComponent],
  declarations: [
    NavbarComponent,
    SigninComponent,
  ],
  entryComponents: [
    SigninComponent,
  ],
  providers: [
    AngularFireAuth,
  ],
})
export class NavbarModule { }
