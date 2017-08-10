import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import * as firebase from 'firebase/app';

import { AuthService } from '../../shared';

@Component({
  moduleId: module.id,
  selector: 'app-sd-signin',
  templateUrl: 'signin.component.html',
  styleUrls: ['signin.component.scss'],
})
export class SigninComponent {
  constructor(
    private dialogRef: MdDialogRef<SigninComponent>,
    private authService: AuthService,
  ) { }

  googleSignin() {
    this.authService.googleSignin();
  }
}
