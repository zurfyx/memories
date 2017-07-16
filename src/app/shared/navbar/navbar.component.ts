import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdDialog } from '@angular/material';
import { Observable } from 'rxjs/Rx';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { LiquidGalaxyServer } from 'liquid-galaxy';
import { BehaviorSubject } from 'rxjs/Rx';

import { CastService } from '../cast';
import { SidenavService } from '../sidenav/sidenav.service';
import { SigninComponent } from './signin.component';

@Component({
  moduleId: module.id,
  selector: 'app-sd-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isMobileNavbarOpen: BehaviorSubject<boolean>;

  user: Observable<firebase.User>;
  activeCast: Observable<LiquidGalaxyServer>;

  constructor(
    private sanitizer: DomSanitizer,
    private dialog: MdDialog,
    private afAuth: AngularFireAuth,
    private castService: CastService,
    private sidenavService: SidenavService,
  ) {
    this.isMobileNavbarOpen = sidenavService.isMobileNavbarOpen;
    this.user = afAuth.authState;
    this.activeCast = this.castService.active;
  }

  ngOnInit() { }

  toggleSidenav() {
    this.isMobileNavbarOpen.next(!this.isMobileNavbarOpen.value);
  }

  openSigninDialog() {
    this.dialog.open(SigninComponent);
  }
}
