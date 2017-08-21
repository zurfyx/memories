import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

import { User } from '../../shared';

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
    return this.afDatabase.object(`users/${uid}`).map((snapshot: any) => (
      new User(snapshot)
    ));
  }

  readCurrentUser(): Observable<User> {
    return this.afAuth.authState.flatMap((user: firebase.User) => (
      user ? this.readUser(user.uid) : Observable.of(null)
    ));
  }

  updateUser(user: User): Observable<User> {
    const { $key, ...unkeyedUser } = user;
    const setPromise = this.afDatabase.object(`users/${$key}`).set(unkeyedUser);
    return Observable.fromPromise(setPromise).map(() => user);
  }

  isAuthenticatedUser(user: User): Observable<boolean> {
    return this.afAuth.authState.map((authUser: firebase.User) => (
      authUser.uid === user.$key
    ));
  }
}
