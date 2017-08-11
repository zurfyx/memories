import { NgModule } from '@angular/core';
import {
  MdDialogModule,
  MdButtonModule,
} from '@angular/material';

import { SharedModule } from '../../shared';
import { ConfirmComponent } from './confirm.component';

@NgModule({
  imports: [
    MdDialogModule,
    MdButtonModule,
    SharedModule,
  ],
  exports: [ConfirmComponent],
  declarations: [ConfirmComponent],
  providers: [],
})
export class ConfirmModule { }
