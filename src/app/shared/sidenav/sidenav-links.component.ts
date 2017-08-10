import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  moduleId: module.id,
  selector: 'app-sd-sidenav-links',
  templateUrl: 'sidenav-links.component.html',
  styleUrls: ['sidenav-links.component.scss'],
})

export class SidenavLinksComponent implements OnInit {
  isSignedIn: boolean;

  constructor(private angularFireAuthService: AngularFireAuth) { }

  ngOnInit() {
    this.angularFireAuthService.authState.subscribe((auth: firebase.User) => {
      this.isSignedIn = !!auth;
    });
  }
}
