import { NgModule } from '@angular/core';
import {
  MdButtonModule,
  MdToolbarModule,
  // MdDialog,
  // OVERLAY_PROVIDERS,
} from '@angular/material';

import { NavbarComponent } from './navbar.component';
import { SigninComponent } from '../auth/signin.component';

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
