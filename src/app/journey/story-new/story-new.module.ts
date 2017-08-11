import { NgModule } from '@angular/core';
import {
  MdInputModule,
  MdButtonModule,
} from '@angular/material';

import { SharedModule } from '../../shared';
import { StoryNewComponent } from './story-new.component';

@NgModule({
  imports: [
    MdInputModule,
    SharedModule,
    MdButtonModule,
  ],
  exports: [StoryNewComponent],
  declarations: [StoryNewComponent],
  providers: [],
})
export class StoryNewModule { }
