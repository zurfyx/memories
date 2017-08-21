import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';

import { NavbarModule } from './navbar';
import { SidenavModule } from './sidenav';
import {
  KmlService,
  AuthGuard,
  AuthService,
  CastService,
  CommentService,
  FileService,
  IdService,
  JourneyService,
  LocationService,
  PwService,
  StoryService,
  UrlShortenerService,
  UserPrivateService,
  UserService,
} from './services';

@NgModule({
  imports: [
    NavbarModule,
    SidenavModule,
  ],
  exports: [
    NavbarModule,
    SidenavModule,
  ],
  declarations: [],
  providers: [
    DatePipe,
    KmlService,
    AuthGuard,
    AuthService,
    CastService,
    CommentService,
    FileService,
    IdService,
    JourneyService,
    LocationService,
    PwService,
    StoryService,
    UrlShortenerService,
    UserPrivateService,
    UserService,
  ],
})
export class CoreModule { }
