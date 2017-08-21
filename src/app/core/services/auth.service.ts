import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { User, UserPrivate } from '../../shared';
import { UserService } from './user.service';
import { UserPrivateService } from './user-private.service';

@Injectable()
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService,
    private userPrivateService: UserPrivateService,
  ) { }

  syncWithFirebase() {
    const user: Observable<firebase.User> = this.afAuth.authState;
    user.subscribe(me => me && this.uploadUser(me));
  }

  googleSignin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithRedirect(provider);
  }

  signout() {
    firebase.auth().signOut();
  }

  private uploadUser(user: firebase.User): Observable<[User, UserPrivate]> {
    const platformUser = new User({
      $key: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      updatedAt: firebase.database.ServerValue.TIMESTAMP,
    });
    const platformUserPrivate = new UserPrivate({
      $key: user.uid,
      email: user.email,
    });
    return Observable.forkJoin(
      this.userService.updateUser(platformUser),
      this.userPrivateService.updateUserPrivate(platformUserPrivate),
    );
  }
}
