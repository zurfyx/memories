import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';

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
  imports: [],
  exports: [],
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
