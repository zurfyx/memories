import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { ResponsiveModule } from 'ng2-responsive';
import { AgmCoreModule } from '@agm/core';
import { AngularFireModule } from 'angularfire2';

import { environment } from '../environments/environment';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { JourneyModule } from './journey/journey.module';
import { PwModule } from './physical-web/pw.module';
import { StoryModule } from './story/story.module';
import { UserModule } from './user/user.module';
import { AppComponent } from './app.component';
import { AuthService } from './shared';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    ResponsiveModule,
    AgmCoreModule.forRoot({
      apiKey: environment.maps.apiKey,
    }),
    AngularFireModule.initializeApp(environment.firebase),
    SharedModule,
    HomeModule,
    JourneyModule,
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
