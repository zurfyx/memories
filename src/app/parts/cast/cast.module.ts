import { NgModule } from '@angular/core';
import {
  MdListModule,
  MdProgressSpinnerModule,
} from '@angular/material';

import { SharedModule } from '../../shared';
import { CastComponent } from './cast.component';
// import { CastToComponent } from './cast-to.component';
import { CastingComponent } from './casting.component';

@NgModule({
  imports: [
    MdListModule,
    MdProgressSpinnerModule,
    SharedModule,
  ],
  exports: [
    CastComponent,
    CastingComponent,
  ],
  declarations: [
    CastComponent,
    // CastToComponent,
    CastingComponent,
  ],
  // entryComponents: [CastToComponent],
})
export class CastModule { }
