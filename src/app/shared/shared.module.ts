import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
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
  FileService,
  IdService,
  JourneyService,
  KmlService,
  LocationService,
  PwService,
  StoryService,
  UrlShortenerService,
  UserService,
} from './services';

@NgModule({
  imports: [
    CommonModule,
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
    DatePipe,
    AuthService,
    FileService,
    IdService,
    JourneyService,
    KmlService,
    LocationService,
    PwService,
    StoryService,
    UrlShortenerService,
    UserService,
  ],
})
export class SharedModule { }
