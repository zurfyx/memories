import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

import { User } from '../models';

@Injectable()
export class UserService {

  constructor(
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
  ) { }

  /**
   * Read a User by its UID.
   * @param uid User UID.
   * @param properties Due to the Firebase permissions, they can't be fully read at once. Hence the
   * desired properties have to be passed through parameters. I.e. (['displayName', 'email'])
   */
  readUser(uid: string, properties: string[]): Observable<User> {
    const options = { preserveSnapshot: true };
    const fetchers = properties.map(prop => this.afDatabase.object(`/users/${uid}/${prop}`, options).first());
    return Observable.forkJoin(fetchers).map((snapshots: any[]) => {
      const values = {};
      snapshots.forEach((snapshot, i) => {
        values[properties[i]] = snapshot.val();
      });
      return new User(values);
    });
  }

  readCurrentUser(properties: string[]): Observable<User> {
    return this.afAuth.authState.flatMap((user: firebase.User) => (
      this.readUser(user.uid, properties)
    ));
  }
}
