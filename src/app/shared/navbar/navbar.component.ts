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

  openSidenav() {
    this.isMobileNavbarOpen.next(false);
    // Hack: sidenav broke because we had to disable translate3d in order to use position: fixed.
    // Sidenav is now unable to recognise when it's fully opened, nor when it's closed.
    // However, sidenav needs to have its property as closed before opening it back again. By
    // pushing the new state in the next tick we are unsuring it toggles states and it performs just
    // well.
    // https://github.com/angular/material2/issues/998
    setTimeout(() => this.isMobileNavbarOpen.next(true));
  }

  openSigninDialog() {
    this.dialog.open(SigninComponent);
  }
}
