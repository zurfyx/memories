import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuard } from '../shared';
import { JourneyResolver } from './journey-resolver.service';
import { JourneyListComponent } from './list/journey-list.component';
import { JourneyNewComponent } from './new/journey-new.component';
import { JourneyDetailComponent } from './detail/journey-detail.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'journeys', component: JourneyListComponent },
      {
        path: 'journeys/new',
        component: JourneyNewComponent,
        canActivate: [AuthGuard] ,
      },
      {
        path: 'journeys/:uid',
        component: JourneyDetailComponent,
        resolve: {
          journey: JourneyResolver,
        }
      },
    ])
  ]
})
export class JourneyRoutingModule { }
