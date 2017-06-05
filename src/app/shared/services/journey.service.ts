import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

import { Journey } from '../models';
import { ImageService } from './image.service';

@Injectable()
export class JourneyService {

  constructor(
    private afDatabase: AngularFireDatabase,
    private imageService: ImageService,
  ) { }

  createJourney(journey: Journey, cover: File): Observable<firebase.database.DataSnapshot> {
    return this.imageService.createImage(cover)
      .flatMap((snapshot: firebase.storage.UploadTaskSnapshot) => {
        const journeys = this.afDatabase.list('journeys');
        const newJourney = {
          title: journey.title,
          coverURL: snapshot.downloadURL,
        };
        return journeys.push(newJourney);
      });
  }
}
