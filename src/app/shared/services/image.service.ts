import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import uuid from 'uuid/v4';

@Injectable()
export class ImageService {

  constructor(
    private afAuth: AngularFireAuth,
  ) { }

  createImage(image: File): Observable<firebase.storage.UploadTaskSnapshot> {
    return this.afAuth.authState.first().flatMap((user) => {
      const filename = uuid();
      const userUid = user.uid;
      const path = `${userUid}/${filename}`;
      const putPromise = firebase.storage().ref(path).put(image);
      return Observable.fromPromise(putPromise);
    });
  }
}
