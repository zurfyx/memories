import { Directive, HostListener } from '@angular/core';
import { MdDialog } from '@angular/material';

import { PwNewComponent } from './pw-new.component';

@Directive({ selector: '[appPwNew]' })
export class PwNewDirective {
  constructor(
    private dialog: MdDialog,
  ) { }

  @HostListener('click') onClick() {
    this.dialog.open(PwNewComponent);
  }
}
