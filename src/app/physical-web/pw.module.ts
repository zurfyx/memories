import { NgModule } from '@angular/core';
import { CdkTableModule } from '@angular/cdk';
import { MdTableModule } from '@angular/material';

import { SharedModule } from '../shared';
import { PwService } from '../core';
import { PwComponent } from './pw.component';
import { PwIntroComponent } from './pw-intro.component';
import { PwListComponent } from './pw-list.component';
import { PwRoutingModule } from './pw-routing.module';

@NgModule({
  imports: [
    CdkTableModule,
    MdTableModule,
    SharedModule,
    PwRoutingModule,
  ],
  exports: [],
  declarations: [
    PwComponent,
    PwIntroComponent,
    PwListComponent,
  ],
  providers: [
    PwService,
  ],
})
export class PwModule { }
