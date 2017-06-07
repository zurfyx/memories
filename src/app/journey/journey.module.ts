import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MdInputModule,
  MdButtonModule,
  MdCardModule,
} from '@angular/material';
import { AngularFireAuthModule } from 'angularfire2/auth';

import {
  ImageService,
  JourneyService,
  UserService,
} from '../shared';
import { JourneyListComponent } from './list/journey-list.component';
import { JourneyListOwnerComponent } from './list/journey-list-owner.component';
import { JourneyNewComponent } from './new/journey-new.component';
import { JourneyRoutingModule } from './journey-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdInputModule,
    MdButtonModule,
    MdCardModule,
    JourneyRoutingModule,
    AngularFireAuthModule,
  ],
  exports: [],
  declarations: [
    JourneyListComponent,
    JourneyListOwnerComponent,
    JourneyNewComponent,
  ],
  providers: [
    ImageService,
    JourneyService,
    UserService,
  ],
})
export class JourneyModule { }
