import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdListModule,
  MdProgressSpinnerModule,
} from '@angular/material';

import { CastService } from './cast.service';
import { CastComponent } from './cast.component';
import { CastToComponent } from './cast-to.component';

@NgModule({
  imports: [
    CommonModule,
    MdListModule,
    MdProgressSpinnerModule,
  ],
  exports: [CastComponent],
  declarations: [
    CastComponent,
    CastToComponent,
  ],
  entryComponents: [CastToComponent],
  providers: [CastService],
})
export class CastModule { }
