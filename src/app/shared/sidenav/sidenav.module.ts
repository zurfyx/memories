import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  MdSidenavModule,
  MdListModule,
} from '@angular/material';

import { SidenavComponent } from './sidenav.component';
import { SidenavLinksComponent } from './sidenav-links.component';

@NgModule({
  imports: [
    RouterModule,
    MdSidenavModule,
    MdListModule,
  ],
  exports: [SidenavComponent],
  declarations: [
    SidenavComponent,
    SidenavLinksComponent,
  ],
  providers: [],
})
export class SidenavModule { }
