import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class SidenavService {
  isMobileNavbarOpen: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(router: Router) {
    // Close sidenav after navigating.
    router.events.subscribe(() => this.isMobileNavbarOpen.next(false));
  }
}
