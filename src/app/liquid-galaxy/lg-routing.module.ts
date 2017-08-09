import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LgComponent } from './lg.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'liquid-galaxy', component: LgComponent },
    ])
  ]
})
export class LgRoutingModule { }
