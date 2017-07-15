import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

import { Pw } from '../models';

@Injectable()
export class PwService {

  constructor(
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
  ) { }

  createPw(pw: Pw): Observable<Pw> {
    return this.afAuth.authState.first().flatMap((user) => {
      const userUid = user.uid;
      const pwRef = this.afDatabase.database.ref(`physicalWeb/${userUid}`);
      const pushPromise = pwRef.push(pw);
      return Observable.fromPromise(pushPromise)
        .map((snapshot: firebase.database.ThenableReference) => new Pw(snapshot));
    })
  }
}
