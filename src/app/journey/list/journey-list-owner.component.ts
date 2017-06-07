import { Component, OnInit, Input } from '@angular/core';

import {
  User,
  UserService,
} from '../../shared';

@Component({
  moduleId: module.id,
  selector: 'app-journey-list-owner',
  templateUrl: 'journey-list-owner.component.html',
})
export class JourneyListOwnerComponent implements OnInit {
  @Input() owner: string; // Owner Uid.
  ownerObj: User;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.userService.readUser(this.owner, ['displayName']).subscribe((user: User) => {
      this.ownerObj = user;
    });
  }
}
