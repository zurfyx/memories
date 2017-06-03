import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import * as firebase from 'firebase/app';

import { AuthService } from '../services';

@Component({
  moduleId: module.id,
  selector: 'app-sd-signin',
  templateUrl: 'signin.component.html'
})
export class SigninComponent implements OnInit {
  constructor(
    private dialogRef: MdDialogRef<SigninComponent>,
    private authService: AuthService,
  ) { }

  ngOnInit() { }

  googleSignin() {
    this.authService.googleSignin();
  }
}
