import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  User,
  UserService,
  UserPrivate,
  UserPrivateService,
  Journey,
  JourneyService,
} from '../../shared';

@Component({
  selector: 'app-user-detail',
  templateUrl: 'user-detail.component.html',
  styleUrls: ['user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  user: User;
  userPrivate: UserPrivate;

  journeys: Journey[];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private userPrivateService: UserPrivateService,
    private journeyService: JourneyService,
  ) {
    this.route.data.subscribe((params: { user: User }) => {
      this.user = params.user;
    });
  }

  ngOnInit() {
    this.userService.isAuthenticatedUser(this.user).first()
      .filter((isAuthenticatedUser: boolean) => isAuthenticatedUser)
      .flatMap(() => (
        // The user it's being checked it the same signed in user. Hence, we can access their
        // private data.
        this.userPrivateService.readUserPrivate(this.user.$key).first()
      ))
      .subscribe((userPrivate: UserPrivate) => {
        this.userPrivate = userPrivate;
      });

    this.journeyService.readJourneysByOwner(this.user.$key)
      .subscribe((journeys: Journey[]) => this.journeys = journeys);
  }
}
