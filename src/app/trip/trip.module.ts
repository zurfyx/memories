import { NgModule } from '@angular/core';

import { TripComponent } from './trip.component';
import { TripRoutingModule } from './trip-routing.module';

@NgModule({
  imports: [
    TripRoutingModule,
  ],
  exports: [],
  declarations: [TripComponent],
  providers: [],
})
export class TripModule { }
