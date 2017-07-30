import { Injectable } from '@angular/core';
import { Resolve, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import {
  User,
  UserService,
} from '../shared';

@Injectable()
export class UserResolver implements Resolve<User> {

  constructor(
    private router: Router,
    private userService: UserService,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<User> {
    const userUid = route.params['uid'];
    return this.userService.readUser(userUid).first()
      .catch((error) => this.router.navigateByUrl('/'));
  }
}
