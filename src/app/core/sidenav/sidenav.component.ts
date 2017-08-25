import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

import { SidenavService } from './sidenav.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav.component.scss'],
})
export class SidenavComponent {
  isMobileNavbarOpen: BehaviorSubject<boolean>;

  constructor(sidenavService: SidenavService) {
    this.isMobileNavbarOpen = sidenavService.isMobileNavbarOpen;
  }

  onDeactivate() {
    window.scrollTo(0, 0);
  }
}
