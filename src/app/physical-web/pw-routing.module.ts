import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PwComponent } from './pw.component';
import { PwIntroComponent } from './pw-intro.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: PwComponent },
      { path: 'intro', component: PwIntroComponent },
    ])
  ]
})
export class PwRoutingModule { }
