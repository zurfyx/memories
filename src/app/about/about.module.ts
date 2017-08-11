import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';
import { AboutComponent } from './about.component';
import { AboutRoutingModule } from './about-routing.module';

@NgModule({
  imports: [
    SharedModule,
    AboutRoutingModule,
  ],
  exports: [],
  declarations: [AboutComponent],
  providers: [],
})
export class AboutModule { }
