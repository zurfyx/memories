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

  readUsers(): Observable<User[]> {
    return this.afDatabase.list('users').map((snapshot: any[]) => (
      snapshot.map(userValues => new User(userValues))
    ));
  }

  readUser(uid: string): Observable<User> {
    const options = { preserveSnapshot: true };
    return this.afDatabase.object(`users/${uid}`).map((snapshot: any) => (
      new User(snapshot)
    ));
  }

  readCurrentUser(): Observable<User> {
    return this.afAuth.authState.flatMap((user: firebase.User) => (
      this.readUser(user.uid)
    ));
  }
}
