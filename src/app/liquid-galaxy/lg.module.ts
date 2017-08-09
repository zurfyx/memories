import { NgModule } from '@angular/core';
import { Ng2PageScrollModule } from 'ng2-page-scroll';

import { LgComponent } from './lg.component';
import { LgRoutingModule } from './lg-routing.module';

@NgModule({
  imports: [
    Ng2PageScrollModule,
    LgRoutingModule,
  ],
  exports: [],
  declarations: [LgComponent],
  providers: [],
})
export class LgModule { }
