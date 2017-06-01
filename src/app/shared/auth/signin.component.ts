import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  moduleId: module.id,
  selector: 'app-sd-signin',
  templateUrl: 'signin.component.html'
})
export class SigninComponent implements OnInit {
  constructor(
    private dialogRef: MdDialogRef<SigninComponent>,
  ) { }

  ngOnInit() { }
}
