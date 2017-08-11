import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdListModule,
  MdProgressSpinnerModule,
} from '@angular/material';

import { SharedModule } from '../../shared';
import { CastService } from './cast.service';
import { CastComponent } from './cast.component';
import { CastToComponent } from './cast-to.component';
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
    CastToComponent,
    CastingComponent,
  ],
  entryComponents: [CastToComponent],
  providers: [CastService],
})
export class CastModule { }
