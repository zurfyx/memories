import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MdSidenavModule } from '@angular/material';

import { SidenavComponent } from './sidenav.component';

@NgModule({
  imports: [
    RouterModule,
    MdSidenavModule,
  ],
  exports: [SidenavComponent],
  declarations: [SidenavComponent],
  providers: [],
})
export class SidenavModule { }
