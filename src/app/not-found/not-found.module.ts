import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';
import { NotFoundComponent } from './not-found.component';
import { NotFoundRoutingModule } from './not-found-routing.module';

@NgModule({
  imports: [SharedModule, NotFoundRoutingModule],
  exports: [],
  declarations: [NotFoundComponent],
  providers: [],
})
export class NotFoundModule { }
