import { NgModule } from '@angular/core';
import {
  MdInputModule,
  MdButtonModule,
  MdCardModule,
  MdListModule,
  MdMenuModule,
  MdTooltipModule,
  MdDialogModule,
  MdSnackBarModule,
} from '@angular/material';

import {
  SharedModule,
  SafeStylePipe,
} from '../shared';
import { CastModule } from '../parts/cast';
import { ConfirmModule, ConfirmComponent } from '../parts/confirm';
import { PwModule } from '../parts/physical-web';
import { StoryNewModule } from './story-new/story-new.module';
import { JourneyListComponent } from './list/journey-list.component';
import { JourneyListOwnerComponent } from './list/journey-list-owner.component';
import { JourneyNewComponent } from './new/journey-new.component';
import { JourneyDetailComponent } from './detail/journey-detail.component';
import { JourneyDetailCastComponent } from './detail/journey-detail-cast.component';
import { JourneyResolver } from './journey-resolver.service';
import { JourneyRoutingModule } from './journey-routing.module';

@NgModule({
  imports: [
    MdInputModule,
    MdButtonModule,
    MdCardModule,
    MdListModule,
    MdMenuModule,
    MdTooltipModule,
    MdDialogModule,
    MdSnackBarModule,
    SharedModule,
    CastModule,
    PwModule,
    ConfirmModule,
    StoryNewModule,
    JourneyRoutingModule,
  ],
  exports: [],
  declarations: [
    JourneyListComponent,
    JourneyListOwnerComponent,
    JourneyNewComponent,
    JourneyDetailComponent,
    JourneyDetailCastComponent,
  ],
  entryComponents: [
    ConfirmComponent,
  ],
  providers: [
    JourneyResolver,
    SafeStylePipe,
  ],
})
export class JourneyModule { }
