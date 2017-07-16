import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk';
import { MdTableModule } from '@angular/material';

import { PwComponent } from './pw.component';
import { PwRoutingModule } from './pw-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CdkTableModule,
    MdTableModule,
    PwRoutingModule,
  ],
  exports: [],
  declarations: [PwComponent],
  providers: [],
})
export class PwModule { }