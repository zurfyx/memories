import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdDialogModule,
  MdButtonModule,
} from '@angular/material';

import { ConfirmComponent } from './confirm.component';

@NgModule({
  imports: [
    CommonModule,
    MdDialogModule,
    MdButtonModule,
  ],
  exports: [ConfirmComponent],
  declarations: [ConfirmComponent],
  providers: [],
})
export class ConfirmModule { }
