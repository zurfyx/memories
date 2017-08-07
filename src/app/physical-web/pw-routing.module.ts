import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PwComponent } from './pw.component';
import { PwIntroComponent } from './pw-intro.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'physical-web', component: PwComponent },
      { path: 'physical-web/intro', component: PwIntroComponent },
    ])
  ]
})
export class PwRoutingModule { }
