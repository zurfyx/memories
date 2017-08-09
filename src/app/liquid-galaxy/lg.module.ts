import { NgModule } from '@angular/core';

import { LgComponent } from './lg.component';
import { LgRoutingModule } from './lg-routing.module';

@NgModule({
  imports: [
    LgRoutingModule,
  ],
  exports: [],
  declarations: [LgComponent],
  providers: [],
})
export class LgModule { }
