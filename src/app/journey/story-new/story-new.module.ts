import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MdInputModule,
  MdButtonModule,
} from '@angular/material';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { StoryNewComponent } from './story-new.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdInputModule,
    MdButtonModule,
    AngularFireAuthModule,
  ],
  exports: [StoryNewComponent],
  declarations: [StoryNewComponent],
  providers: [],
})
export class StoryNewModule { }
