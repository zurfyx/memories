import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

import { UserPrivate } from '../models';

@Injectable()
export class UserPrivateService {
  constructor(
    private afDatabase: AngularFireDatabase,
  ) { }

  updateUserPrivate(userPrivate: UserPrivate): Observable<UserPrivate> {
    const { $key, ...unkeyedUser } = userPrivate;
    const setPromise = this.afDatabase.object(`usersPrivate/${$key}`).set(unkeyedUser);
    return Observable.fromPromise(setPromise).map(() => userPrivate);
  }
}
