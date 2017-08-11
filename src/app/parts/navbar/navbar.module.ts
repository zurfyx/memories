import { NgModule } from '@angular/core';
import {
  MdButtonModule,
  MdToolbarModule,
  MdMenuModule,
} from '@angular/material';

import { SharedModule } from '../../shared';
import { CastModule } from '../cast';
import { SidenavService } from '../sidenav/sidenav.service';
import { NavbarComponent } from './navbar.component';
import { SigninComponent } from './signin.component';

@NgModule({
  imports: [
    MdButtonModule,
    MdToolbarModule,
    MdMenuModule,
    SharedModule,
    CastModule,
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
    SidenavService, // (exception) module's not imported to prevent a circular import.
  ],
})
export class NavbarModule { }
