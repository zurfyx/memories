import { NgModule } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { NavbarModule, NavbarComponent } from './navbar';
import { SidenavModule, SidenavComponent } from './sidenav';
import {
  AuthService,
} from './services';

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
  providers: [
    AngularFireAuth,
    AngularFireDatabase,
    AuthService,
  ],
})
export class SharedModule { }
