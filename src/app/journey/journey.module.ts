import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdInputModule, MdButtonModule } from '@angular/material';

import {
  JourneyService,
} from '../shared';
import { JourneyListComponent } from './list/journey-list.component';
import { JourneyNewComponent } from './new/journey-new.component';
import { JourneyRoutingModule } from './journey-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdInputModule,
    MdButtonModule,
    JourneyRoutingModule,
  ],
  exports: [],
  declarations: [
    JourneyListComponent,
    JourneyNewComponent,
  ],
  providers: [
    JourneyService,
  ],
})
export class JourneyModule { }
