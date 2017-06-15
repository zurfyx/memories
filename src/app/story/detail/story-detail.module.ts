import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdButtonModule,
  MdInputModule,
  MdNativeDateModule,
  MdDatepickerModule,
  MdSnackBarModule,
} from '@angular/material';
import { AgmCoreModule } from '@agm/core';

import {
  SafeStylePipe,
} from '../../shared';
import { StoryDetailComponent } from './story-detail.component';
import { StoryDetailBannerComponent } from './banner/story-detail-banner.component';
import { StoryDetailDateComponent } from './date/story-detail-date.component';
import { StoryDetailDescriptionComponent } from './description/story-detail-description.component';
import { StoryDetailMapComponent } from './map/story-detail-map.component';
import { StoryDetailPhotoComponent } from './photo/story-detail-photo.component';
import { StoryDetailTitleComponent } from './title/story-detail-title.component';

@NgModule({
  imports: [
    CommonModule,
    MdButtonModule,
    MdInputModule,
    MdNativeDateModule,
    MdDatepickerModule,
    MdSnackBarModule,
    AgmCoreModule,
  ],
  exports: [],
  declarations: [
    StoryDetailComponent,
    StoryDetailBannerComponent,
    StoryDetailDateComponent,
    StoryDetailDescriptionComponent,
    StoryDetailMapComponent,
    StoryDetailPhotoComponent,
    StoryDetailTitleComponent,
  ],
  providers: [
    SafeStylePipe,
  ],
})
export class StoryDetailModule { }
