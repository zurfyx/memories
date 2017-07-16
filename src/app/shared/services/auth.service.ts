import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
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

  private uploadUser(user: firebase.User): firebase.Promise<void> {
    return this.afDatabase
      .list('/users')
      .update(user.uid, {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
  }
}
