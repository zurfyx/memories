import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MdInputModule,
  MdButtonModule,
  MdCardModule,
  MdListModule,
} from '@angular/material';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { JourneyListComponent } from './list/journey-list.component';
import { JourneyListOwnerComponent } from './list/journey-list-owner.component';
import { JourneyNewComponent } from './new/journey-new.component';
import { JourneyDetailComponent } from './detail/journey-detail.component';
import { JourneyResolver } from './journey-resolver.service';
import { JourneyRoutingModule } from './journey-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdInputModule,
    MdButtonModule,
    MdCardModule,
    MdListModule,
    JourneyRoutingModule,
    AngularFireAuthModule,
  ],
  exports: [],
  declarations: [
    JourneyListComponent,
    JourneyListOwnerComponent,
    JourneyNewComponent,
    JourneyDetailComponent,
  ],
  providers: [
    JourneyResolver,
  ],
})
export class JourneyModule { }
