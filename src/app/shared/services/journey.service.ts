import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import shortid from 'shortid';

import { Journey } from '../models';
import { ImageService } from './image.service';

@Injectable()
export class JourneyService {

  constructor(
    private afDatabase: AngularFireDatabase,
    private imageService: ImageService,
  ) { }

  createJourney(journey: Journey): Observable<void> {
    const journeyId = shortid.generate();
    const journeys = this.afDatabase.object(`journeys/${journeyId}`);
    const setPromise = journeys.set(journey);
    return Observable.fromPromise(setPromise);
  }

  /**
   * Creates a new journey with the passed journey. If a cover file is given it will be uploaded
   * onto the storage and journey.coverURL replaced with the resulting URL.
   * @param journey A complete journey object, excepting coverURL which can be left blank.
   * @param cover A cover file.
   */
  createJourneyWithCoverFile(journey: Journey, cover?: File): Observable<void> {
    if (!cover) {
      return this.createJourney(journey);
    }

    return this.imageService.createImage(cover)
      .flatMap((snapshot: firebase.storage.UploadTaskSnapshot) => {
        journey.coverURL = snapshot.downloadURL;
        return this.createJourney(journey);
      });
  }

  readJourneys(): Observable<Journey[]> {
    const afListOptions = {
      query: { orderByChild: 'updatedAt' }
    };
    return this.afDatabase.list('/journeys', afListOptions).map((snapshot: any[]) => (
      snapshot.map(journeyValues => new Journey(journeyValues))
    ));
  }

  readJourney(uid: string): Observable<Journey> {
    return this.afDatabase.object(`/journeys/${uid}`).map((snapshot: any) => (
      new Journey(snapshot)
    ));
  }
}
