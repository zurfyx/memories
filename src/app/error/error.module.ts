import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';
import { Error404Component } from './error-404.component';
import { ErrorRoutingModule } from './error-routing.module';

@NgModule({
  imports: [
    SharedModule,
    ErrorRoutingModule,
  ],
  exports: [],
  declarations: [
    Error404Component,
  ],
  providers: [],
})
export class ErrorModule { }
