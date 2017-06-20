import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import { CastToComponent } from './cast-to.component';

@Component({
  selector: 'app-cast',
  templateUrl: 'cast.component.html',
})
export class CastComponent implements OnInit {
  constructor(
    private dialog: MdDialog,
  ) { }

  ngOnInit() { }

  openCastToDialog() {
    this.dialog.open(CastToComponent);
  }
}
