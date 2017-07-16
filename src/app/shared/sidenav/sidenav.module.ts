import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  MdSidenavModule,
  MdListModule,
} from '@angular/material';
import { ResponsiveModule } from 'ng2-responsive';

import { NavbarModule } from '../navbar';
import { SidenavComponent } from './sidenav.component';
import { SidenavLinksComponent } from './sidenav-links.component';
import { SidenavService } from './sidenav.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MdSidenavModule,
    MdListModule,
    ResponsiveModule,
    NavbarModule,
  ],
  exports: [SidenavComponent],
  declarations: [
    SidenavComponent,
    SidenavLinksComponent,
  ],
  providers: [
    SidenavService,
  ],
})
export class SidenavModule { }
