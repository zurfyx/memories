import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import { SigninComponent } from '../auth/signin.component';

@Component({
  moduleId: module.id,
  selector: 'app-sd-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private dialog: MdDialog,
  ) { }

  ngOnInit() { }

  openSigninDialog() {
    const dialogRef = this.dialog.open(SigninComponent);
  }
}
