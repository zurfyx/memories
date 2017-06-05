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

  createJourneyWithCoverFile(journey: Journey, cover?: File): Observable<void> {
    if (!cover) {
      return this.createJourney(journey);
    }

    return this.imageService.createImage(cover)
      .flatMap((snapshot: firebase.storage.UploadTaskSnapshot) => {
        const newJourney = {
          title: journey.title,
          coverURL: snapshot.downloadURL,
        };
        return this.createJourney(newJourney);
      });
  }
}
