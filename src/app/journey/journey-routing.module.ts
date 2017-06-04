import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JourneyListComponent } from './list/journey-list.component';
import { JourneyNewComponent } from './new/journey-new.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'journeys', component: JourneyListComponent },
      { path: 'journeys/new', component: JourneyNewComponent },
    ])
  ]
})
export class JourneyRoutingModule { }
