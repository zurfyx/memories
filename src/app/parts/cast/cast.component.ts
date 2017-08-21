import { Component } from '@angular/core';
import { MdDialog } from '@angular/material';

import { CastToComponent } from './cast-to.component';

@Component({
  selector: 'app-cast',
  templateUrl: 'cast.component.html',
})
export class CastComponent {
  constructor(private dialog: MdDialog) { }

  openCastToDialog() {
    this.dialog.open(CastToComponent);
  }
}
