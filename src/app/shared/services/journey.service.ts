import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

import { Journey } from '../models';
import { FileService } from './file.service';
import { IdService } from './id.service';

@Injectable()
export class JourneyService {

  constructor(
    private afDatabase: AngularFireDatabase,
    private imageService: FileService,
    private idService: IdService,
  ) { }

  createJourney(journey: Journey): Observable<Journey> {
    const journeyId = this.idService.short();
    const journeys = this.afDatabase.object(`journeys/${journeyId}`);
    const setPromise = journeys.set(journey);
    return Observable.fromPromise(setPromise)
      .map(() => {
        const newValues = Object.assign({ $key: journeyId }, journey);
        return new Journey(newValues);
      });
  }

  /**
   * Creates a new journey with the passed journey. If a cover file is given it will be uploaded
   * onto the storage and journey.coverURL replaced with the resulting URL.
   * @param journey A complete journey object, excepting coverURL which can be left blank.
   * @param cover A cover file.
   */
  createJourneyWithCoverFile(journey: Journey, cover?: File): Observable<Journey> {
    if (!cover) {
      return this.createJourney(journey);
    }

    return this.imageService.createImage(cover)
      .flatMap((snapshot: firebase.storage.UploadTaskSnapshot) => {
        const newValues = Object.assign({ coverURL: snapshot.downloadURL }, journey);
        const newJourney = new Journey(newValues);
        return this.createJourney(newJourney);
      });
  }

  readJourneys(): Observable<Journey[]> {
    const afListOptions = {
      query: { orderByChild: 'updatedAt' }
    };
    return this.afDatabase.list('journeys', afListOptions).map((snapshot: any[]) => (
      snapshot.map(journeyValues => new Journey(journeyValues))
    ));
  }

  readJourney(uid: string): Observable<Journey> {
    return this.afDatabase.object(`journeys/${uid}`).map((snapshot: any) => (
      new Journey(snapshot)
    ));
  }
}
