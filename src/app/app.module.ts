import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AngularFireModule } from 'angularfire2';

import { environment } from '../environments/environment';
import { SharedModule } from './shared/shared.module';
import { TripModule } from './trip/trip.module';
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
    AngularFireModule.initializeApp(environment.firebase),
    SharedModule,
    TripModule,
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
