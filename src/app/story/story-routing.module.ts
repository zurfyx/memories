import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StoryResolver } from './story-resolver.service';
import { StoryDetailComponent } from './detail/story-detail.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: ':uid',
        component: StoryDetailComponent,
        resolve: {
          story: StoryResolver,
        }
      }
    ])
  ]
})
export class StoryRoutingModule { }
