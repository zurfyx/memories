import { NgModule } from '@angular/core';
import { Ng2PageScrollModule } from 'ng2-page-scroll';

import { SharedModule } from '../shared';
import { LgComponent } from './lg.component';
import { LgRoutingModule } from './lg-routing.module';

@NgModule({
  imports: [
    Ng2PageScrollModule,
    SharedModule,
    LgRoutingModule,
  ],
  exports: [],
  declarations: [LgComponent],
  providers: [],
})
export class LgModule { }
