import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AgmCoreModule } from '@agm/core';
import { AngularFireModule } from 'angularfire2';
import { ResponsiveModule } from 'ng2-responsive';

import { environment } from '../environments/environment';
import {
  SharedModule,
  AuthService,
  UserService,
  UserPrivateService,
} from './shared';
import { NavbarModule } from './parts/navbar';
import { SidenavModule } from './parts/sidenav';
import { AboutModule } from './about/about.module';
import { HomeModule } from './home/home.module';
import { JourneyModule } from './journey/journey.module';
import { LgModule } from './liquid-galaxy/lg.module';
import { PwModule } from './physical-web/pw.module';
import { StoryModule } from './story/story.module';
import { UserModule } from './user/user.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    AgmCoreModule.forRoot({
      apiKey: environment.maps.apiKey,
    }),
    AngularFireModule.initializeApp(environment.firebase),
    ResponsiveModule,
    SharedModule,
    NavbarModule,
    SidenavModule,
    AboutModule,
    HomeModule,
    JourneyModule,
    LgModule,
    PwModule,
    StoryModule,
    UserModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    AuthService,
    UserService,
    UserPrivateService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
