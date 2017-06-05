import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as firebase from 'firebase';
import uuid from 'uuid/v4';

@Injectable()
export class ImageService {

  constructor() { }

  createImage(image: File): Observable<firebase.storage.UploadTaskSnapshot> {
    const filename = uuid();
    const putPromise = firebase.storage().ref(filename).put(image);
    return Observable.fromPromise(putPromise);
  }
}
