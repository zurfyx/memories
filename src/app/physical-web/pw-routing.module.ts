import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PwComponent } from './pw.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'physical-web', component: PwComponent }
    ])
  ]
})
export class PwRoutingModule { }
