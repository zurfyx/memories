import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs/Rx';

import {
  User,
} from '../../shared';
import {
  UserService,
} from '../../core';

@Component({
  selector: 'app-user-list',
  templateUrl: 'user-list.component.html',
  styleUrls: ['user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
  destroy: ReplaySubject<any> = new ReplaySubject();

  users: User[];
  usersFiltered: User[];

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.userService.readUsers()
      .takeUntil(this.destroy)
      .subscribe((users: User[]) => {
        this.users = users;
      });
  }

  ngOnDestroy() {
    this.destroy.next(true);
  }

  filter(event: Event) {
    const input = event.target as HTMLInputElement;
    const displayName = input.value;
    if (displayName === '') {
      this.usersFiltered = null;
      return;
    }
    this.usersFiltered = this.users.filter((user: User) => (
      user.displayName.toLowerCase().includes(displayName.toLowerCase())
    ));
  }
}
