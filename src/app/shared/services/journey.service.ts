import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

import { Journey } from '../models';

@Injectable()
export class JourneyService {

  constructor(
    private afDatabase: AngularFireDatabase
  ) { }

  createJourney(journey: Journey, cover: File) {
    const journeys = this.afDatabase.list('journeys');

    firebase.storage().ref('smth.jpg').put(cover)
      .then((snapshot) => {
        journeys.push({
          title: journey.title,
          coverURL: snapshot.downloadURL,
        });
      });

  }
}
