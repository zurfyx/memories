import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

import { User } from '../models';

@Injectable()
export class UserService {

  constructor(
    private afDatabase: AngularFireDatabase,
  ) { }

  /**
   * Read a User by its UID.
   * @param uid User UID.
   * @param properties Due to the Firebase permissions, they can't be fully read at once. Hence the
   * desired properties have to be passed through parameters. I.e. (['displayName', 'email'])
   */
  readUser(uid: string, properties: string[]): Observable<User> {
    const property = properties[0]; // TODO: Fetch more than one property at once.
    const options = { preserveSnapshot: true };
    return this.afDatabase.object(`users/${uid}/${property}`, options).map((snapshot: any) => (
      new User({ [property]: snapshot.val() })
    ));
  }
}
