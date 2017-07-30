import { Component, OnInit } from '@angular/core';

import {
  User,
  UserService,
} from '../../shared';

@Component({
  selector: 'app-user-list',
  templateUrl: 'user-list.component.html',
  styleUrls: ['user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users: User[];
  usersFiltered: User[];

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.userService.readUsers().subscribe((users: User[]) => {
      this.users = users;
    });
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
