import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdDialog } from '@angular/material';
import { Observable } from 'rxjs/Rx';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { LiquidGalaxyServer } from 'liquid-galaxy';

import { CastService } from '../cast';
import { SigninComponent } from './signin.component';

@Component({
  moduleId: module.id,
  selector: 'app-sd-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user: Observable<firebase.User>;
  activeCast: Observable<LiquidGalaxyServer>;

  constructor(
    private sanitizer: DomSanitizer,
    private dialog: MdDialog,
    private afAuth: AngularFireAuth,
    private castService: CastService,
  ) {
    this.user = afAuth.authState;
    this.activeCast = this.castService.active;
  }

  ngOnInit() { }

  openSigninDialog() {
    this.dialog.open(SigninComponent);
  }
}
