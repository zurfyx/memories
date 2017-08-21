import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuard } from '../core';
import { JourneyResolver } from './journey-resolver.service';
import { JourneyListComponent } from './list/journey-list.component';
import { JourneyNewComponent } from './new/journey-new.component';
import { JourneyDetailComponent } from './detail/journey-detail.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: JourneyListComponent },
      {
        path: 'new',
        component: JourneyNewComponent,
        canActivate: [AuthGuard] ,
      },
      {
        path: ':uid',
        component: JourneyDetailComponent,
        resolve: {
          journey: JourneyResolver,
        }
      },
    ])
  ]
})
export class JourneyRoutingModule { }
