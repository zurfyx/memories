import { NgModule } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { CastModule } from './cast';
import { NavbarModule, NavbarComponent } from './navbar';
import { SidenavModule, SidenavComponent } from './sidenav';
import {
  SafeHtmlPipe,
  SafeStylePipe,
} from './pipes';
import {
  AuthService,
  IdService,
  ImageService,
  JourneyService,
  UserService,
  StoryService,
} from './services';

@NgModule({
  imports: [
    CastModule,
    NavbarModule,
    SidenavModule,
  ],
  exports: [
    NavbarComponent,
    SidenavComponent,
  ],
  declarations: [
    SafeHtmlPipe,
    SafeStylePipe,
  ],
  providers: [
    AngularFireAuth,
    AngularFireDatabase,
    AuthService,
    IdService,
    ImageService,
    JourneyService,
    UserService,
    StoryService,
  ],
})
export class SharedModule { }
