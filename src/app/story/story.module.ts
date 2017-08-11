import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';
import { StoryResolver } from './story-resolver.service';
import { StoryDetailModule } from './detail/story-detail.module';
import { StoryRoutingModule } from './story-routing.module';

@NgModule({
  imports: [
    SharedModule,
    StoryDetailModule,
    StoryRoutingModule,
  ],
  exports: [],
  declarations: [],
  providers: [
    StoryResolver,
  ],
})
export class StoryModule { }
