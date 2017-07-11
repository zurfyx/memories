import { Directive, HostListener } from '@angular/core';
import { MdDialog } from '@angular/material';

import { PwNewComponent } from './pw-new.component';

@Directive({ selector: '[appPwNew]' })
export class PwNewDirective {
  constructor(
    private dialog: MdDialog,
  ) {
    this.dialog.open(PwNewComponent);; // Remove me!!
  }

  @HostListener('click') onClick() {
    this.dialog.open(PwNewComponent);
  }
}
