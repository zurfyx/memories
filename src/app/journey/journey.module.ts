import { NgModule } from '@angular/core';

import { JourneyListComponent } from './list/journey-list.component';
import { JourneyNewComponent } from './new/journey-new.component';
import { JourneyRoutingModule } from './journey-routing.module';

@NgModule({
  imports: [
    JourneyRoutingModule,
  ],
  exports: [],
  declarations: [
    JourneyListComponent,
    JourneyNewComponent,
  ],
  providers: [],
})
export class JourneyModule { }
