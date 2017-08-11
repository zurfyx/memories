import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  MdSidenavModule,
  MdListModule,
} from '@angular/material';
import { ResponsiveModule } from 'ng2-responsive';

import { SharedModule } from '../../shared';
import { NavbarModule } from '../navbar';
import { SidenavComponent } from './sidenav.component';
import { SidenavLinksComponent } from './sidenav-links.component';
import { SidenavService } from './sidenav.service';

@NgModule({
  imports: [
    MdSidenavModule,
    MdListModule,
    SharedModule,
    NavbarModule,
  ],
  exports: [SidenavComponent],
  declarations: [
    SidenavComponent,
    SidenavLinksComponent,
  ],
  providers: [SidenavService],
})
export class SidenavModule { }
