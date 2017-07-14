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
  createFile(file: File | string, contentType?: string): Observable<firebase.storage.UploadTaskSnapshot> {
    return this.afAuth.authState.first().flatMap((user) => {
      const userUid = user.uid;
      const filename = uuid();
      const path = `${userUid}/${filename}`;
      const storage = firebase.storage().ref(path);
      const metadata: firebase.storage.UploadMetadata = contentType && { contentType };
      const putPromise = file instanceof File
        ? storage.put(file, contentType)
        : storage.putString(file, firebase.storage.StringFormat.RAW, metadata);
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
      </html>`;
    const minified = body.trim().replace(/>\s+</g, '><');
    return this.createFile(minified, 'text/html');
  }
}

export interface RedirectHtmlParams {
  title: string,
  description: string,
  redirectUri: string,
};
