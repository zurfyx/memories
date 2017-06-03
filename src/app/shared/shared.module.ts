import { NgModule } from '@angular/core';

import { NavbarModule, NavbarComponent } from './navbar';
import { SidenavModule, SidenavComponent } from './sidenav';

@NgModule({
  imports: [
    NavbarModule,
    SidenavModule,
  ],
  exports: [
    NavbarComponent,
    SidenavComponent,
  ],
  declarations: [],
  providers: [],
})
export class SharedModule { }
