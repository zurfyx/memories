import { Component, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirm',
  templateUrl: 'confirm.component.html'
})

export class ConfirmComponent {
  constructor(
    @Inject(MD_DIALOG_DATA) private data: any
  ) { }

}
