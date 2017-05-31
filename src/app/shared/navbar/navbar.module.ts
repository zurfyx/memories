import { NgModule } from '@angular/core';
import {
  MdButtonModule,
  MdToolbarModule,
} from '@angular/material';

import { NavbarComponent } from './navbar.component';

@NgModule({
  imports: [
    MdButtonModule,
    MdToolbarModule,
  ],
  exports: [NavbarComponent],
  declarations: [NavbarComponent],
  providers: [],
})
export class NavbarModule { }
