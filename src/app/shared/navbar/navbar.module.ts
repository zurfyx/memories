import { NgModule } from '@angular/core';
import {
  MdButtonModule,
  MdToolbarModule,
} from '@angular/material';

import { NavbarComponent } from './navbar.component';
import { SigninComponent } from './signin.component';

@NgModule({
  imports: [
    MdButtonModule,
    MdToolbarModule,
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
  ],
})
export class NavbarModule { }
