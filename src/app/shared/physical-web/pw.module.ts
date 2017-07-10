import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PwNewComponent } from './pw-new.component';
import { PwNewDirective } from './pw-new.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    PwNewComponent,
    PwNewDirective,
  ],
  declarations: [
    PwNewComponent,
    PwNewDirective,
  ],
  entryComponents: [
    PwNewComponent,
  ],
  providers: [],
})
export class PwModule { }
