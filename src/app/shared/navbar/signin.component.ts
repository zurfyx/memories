import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  moduleId: module.id,
  selector: 'app-sd-signin',
  templateUrl: 'signin.component.html'
})
export class SigninComponent implements OnInit {
  constructor(
    private dialogRef: MdDialogRef<SigninComponent>,
    private afAuth: AngularFireAuth,
  ) { }

  ngOnInit() { }

  googleSignin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithRedirect(provider);
  }
}
