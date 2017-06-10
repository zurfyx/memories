import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdButtonModule,
} from '@angular/material';

import { StoryDetailComponent } from './detail/story-detail.component';
import { StoryResolver } from './story-resolver.service';
import { StoryRoutingModule } from './story-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MdButtonModule,
    StoryRoutingModule,
  ],
  exports: [],
  declarations: [
    StoryDetailComponent,
  ],
  providers: [
    StoryResolver,
  ],
})
export class StoryModule { }
