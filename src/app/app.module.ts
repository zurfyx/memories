import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { AgmCoreModule } from '@agm/core';
import { AngularFireModule } from 'angularfire2';

import { environment } from '../environments/environment';
import {
  SharedModule,
  AuthService,
  UserService,
  UserPrivateService,
} from './shared';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { NavbarModule } from './parts/navbar';
import { SidenavModule } from './parts/sidenav';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AgmCoreModule.forRoot({
      apiKey: environment.maps.apiKey,
    }),
    AngularFireModule.initializeApp(environment.firebase),
    SharedModule,
    CoreModule,
    NavbarModule,
    SidenavModule,
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
