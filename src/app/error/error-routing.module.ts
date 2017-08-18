import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Error404Component } from './error-404.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '**', component: Error404Component },
    ])
  ]
})
export class ErrorRoutingModule { }
