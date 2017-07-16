import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

import { SidenavService } from './sidenav.service';

@Component({
  moduleId: module.id,
  selector: 'app-sd-sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  isMobileNavbarOpen: BehaviorSubject<boolean>;

  constructor(private sidenavService: SidenavService) {
    this.isMobileNavbarOpen = sidenavService.isMobileNavbarOpen;

    setTimeout(() => this.isMobileNavbarOpen.next(true), 3000);
  }

  ngOnInit() { }
}
