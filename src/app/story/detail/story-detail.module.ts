import { NgModule } from '@angular/core';
import {
  MdButtonModule,
  MdInputModule,
  MdNativeDateModule,
  MdDatepickerModule,
  MdSnackBarModule,
  MdMenuModule,
  MdTooltipModule,
  MdDialogModule,
} from '@angular/material';
import { AgmCoreModule } from '@agm/core';

import {
  SharedModule,
  SafeStylePipe,
  SafeUrlPipe,
  FileService,
  IdService,
  StoryService,
  CommentService,
} from '../../shared';
import { CastModule } from '../../parts/cast';
import { PwModule } from '../../parts/physical-web';
import { ConfirmModule, ConfirmComponent } from '../../parts/confirm';
import { StoryDetailComponent } from './story-detail.component';
import { StoryDetailBannerComponent } from './banner/story-detail-banner.component';
import { StoryDetailCastComponent } from './cast/story-detail-cast.component';
import { StoryDetailCommentComponent } from './comment/story-detail-comment.component';
import { StoryDetailCommentNewComponent } from './comment/story-detail-comment-new.component';
import { StoryDetailDateComponent } from './date/story-detail-date.component';
import { StoryDetailDescriptionComponent } from './description/story-detail-description.component';
import { StoryDetailMapComponent } from './map/story-detail-map.component';
import { StoryDetailPhotoComponent } from './photo/story-detail-photo.component';
import { StoryDetailGalleryComponent } from './photo/story-detail-gallery.component';
import { StoryDetailTitleComponent } from './title/story-detail-title.component';

@NgModule({
  imports: [
    MdButtonModule,
    MdInputModule,
    MdNativeDateModule,
    MdDatepickerModule,
    MdSnackBarModule,
    MdMenuModule,
    MdTooltipModule,
    MdDialogModule,
    AgmCoreModule,
    SharedModule,
    CastModule,
    PwModule,
    ConfirmModule,
  ],
  exports: [],
  declarations: [
    StoryDetailComponent,
    StoryDetailBannerComponent,
    StoryDetailCastComponent,
    StoryDetailCommentComponent,
    StoryDetailCommentNewComponent,
    StoryDetailDateComponent,
    StoryDetailDescriptionComponent,
    StoryDetailMapComponent,
    StoryDetailPhotoComponent,
    StoryDetailGalleryComponent,
    StoryDetailTitleComponent,
  ],
  entryComponents: [
    ConfirmComponent,
    StoryDetailGalleryComponent,
  ],
  providers: [
    CommentService,
    SafeStylePipe,
    SafeUrlPipe,
    FileService,
    IdService,
    StoryService,
  ],
})
export class StoryDetailModule { }
