import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { CastModule } from './cast';
import { NavbarModule, NavbarComponent } from './navbar';
import { SidenavModule, SidenavComponent } from './sidenav';
import {
  ShowOnSignedInDirective,
} from './directives';
import {
  SafeHtmlPipe,
  SafeStylePipe,
  SafeUrlPipe,
} from './pipes';
import {
  AuthService,
  CommentService,
  FileService,
  IdService,
  JourneyService,
  KmlService,
  LocationService,
  PwService,
  StoryService,
  UrlShortenerService,
  UserPrivateService,
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
    ShowOnSignedInDirective,
    SafeHtmlPipe,
    SafeStylePipe,
    SafeUrlPipe,
  ],
  declarations: [
    ShowOnSignedInDirective,
    SafeHtmlPipe,
    SafeStylePipe,
    SafeUrlPipe,
  ],
  providers: [
    AngularFireAuth,
    AngularFireDatabase,
    DatePipe,
    AuthService,
    CommentService,
    FileService,
    IdService,
    JourneyService,
    KmlService,
    LocationService,
    PwService,
    StoryService,
    UrlShortenerService,
    UserPrivateService,
    UserService,
  ],
})
export class SharedModule { }
