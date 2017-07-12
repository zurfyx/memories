import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MdInputModule,
  MdButtonModule,
} from '@angular/material';

import { PwNewComponent } from './pw-new.component';
import { PwNewScanComponent } from './pw-new-scan.component';
import { PwNewSaveComponent } from './pw-new-save.component';
import { PwNewCompleteComponent } from './pw-new-complete.component';
import { PwNewDirective } from './pw-new.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdInputModule,
    MdButtonModule,
  ],
  exports: [
    PwNewComponent,
    PwNewDirective,
  ],
  declarations: [
    PwNewComponent,
    PwNewScanComponent,
    PwNewSaveComponent,
    PwNewCompleteComponent,
    PwNewDirective,
  ],
  entryComponents: [
    PwNewComponent,
  ],
  providers: [],
})
export class PwModule { }
