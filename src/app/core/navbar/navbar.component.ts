import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { ReplaySubject } from 'rxjs/Rx';
import { LiquidGalaxyServer } from 'liquid-galaxy';
import { BehaviorSubject } from 'rxjs/Rx';

import { User } from '../../shared';
import {
  AuthService,
  UserService,
  CastService,
} from '../services';
import { SidenavService } from '../sidenav/sidenav.service';
import { SigninComponent } from './signin.component';

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  destroy: ReplaySubject<any> = new ReplaySubject();

  isMobileNavbarOpen: BehaviorSubject<boolean>;

  user: User;
  castServer: BehaviorSubject<LiquidGalaxyServer>;

  constructor(
    private router: Router,
    private dialog: MdDialog,
    private authService: AuthService,
    private userService: UserService,
    castService: CastService,
    sidenavService: SidenavService,
  ) {
    this.isMobileNavbarOpen = sidenavService.isMobileNavbarOpen;
    this.castServer = castService.active;
  }

  ngOnInit() {
    this.userService.readCurrentUser()
      .takeUntil(this.destroy)
      .subscribe((user: User) => {
        this.user = user;
      });
  }

  ngOnDestroy() {
    this.destroy.next(true);
  }

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

  signout() {
    this.authService.signout();
  }

  navigateToUser() {
    this.router.navigate([`/users/${this.user.$key}`]);
  }
}
