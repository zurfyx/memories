import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import uuid from 'uuid/v4';

@Injectable()
export class FileService {

  constructor(
    private afAuth: AngularFireAuth,
  ) { }

  /**
   * Creates file to user auth-protected storage.
   */
  createFile(file: File | any): Observable<firebase.storage.UploadTaskSnapshot> {
    return this.afAuth.authState.first().flatMap((user) => {
      const filename = uuid();
      const userUid = user.uid;
      const path = `${userUid}/${filename}`;
      const putPromise = firebase.storage().ref(path).put(file);
      return Observable.fromPromise(putPromise);
    });
  }

  createImage(image: File): Observable<firebase.storage.UploadTaskSnapshot> {
    return this.createFile(image);
  }

  createRedirectHtml(values: RedirectHtmlParams): Observable<firebase.storage.UploadTaskSnapshot> {
    const body = `
      <html>
      <head>
        <title>${values.title}</title>
        <meta name="description" content="${values.description}" />
        <script>window.location.href = '${values.redirectUri}';</script>
      </head>
      </html>
    `;
    return this.createFile(body);
  }
}

export interface RedirectHtmlParams {
  title: string,
  description: string,
  redirectUri: string,
};
