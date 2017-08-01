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

  /**
   * Deletes a file from current signed in user auth-protected storage.
   */
  deleteFile(filename: string): Observable<void> {
    return this.afAuth.authState.first().flatMap((user: firebase.User) => {
      const userUid = user.uid;
      const path = `${userUid}/${filename}`;
      const removePromise = firebase.storage().ref(path).delete();
      return Observable.fromPromise(removePromise);
    });
  }

  /**
   * Deletes a file from current sgined in user auth-protected storage by using the download URL.
   * The download URL must be well-formed firebase file one:
   * https://firebasestorage.googleapis.com/v0/b/<host>/o/<userUid>%2F1<filename>?<optional>
   */
  deleteFileByDownloadURL(url: string): Observable<void> {
    const decodedUrl = decodeURIComponent(url);
    const regex = /\/o\/([a-zA-Z0-9]+)\/([a-zA-Z0-9-]+)/i;
    const matches = regex.exec(decodedUrl);
    const filename = matches[2];
    return this.deleteFile(filename);
  }
}

export interface RedirectHtmlParams {
  title: string,
  description: string,
  redirectUri: string,
};
