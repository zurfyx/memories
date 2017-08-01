import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

import { Journey, Story } from '../models';
import { FileService } from './file.service';
import { StoryService } from './story.service';
import { IdService } from './id.service';

@Injectable()
export class JourneyService {

  constructor(
    private afDatabase: AngularFireDatabase,
    private fileService: FileService,
    private storyService: StoryService,
    private idService: IdService,
  ) { }

  createJourney(journey: Journey): Observable<Journey> {
    const journeyId = this.idService.short();
    const newJourney = Object.assign({ $key: journeyId }, journey);
    return this.updateJourney(newJourney);
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

    return this.fileService.createImage(cover)
      .flatMap((snapshot: firebase.storage.UploadTaskSnapshot) => {
        const newValues = Object.assign({ coverURL: snapshot.downloadURL }, journey);
        const newJourney = new Journey({ // Don't modify the original subject.
          ...journey,
          coverURL: snapshot.downloadURL,
        });
        return this.createJourney(newJourney);
      });
  }

  readJourneys(afListOptions?: Object): Observable<Journey[]> {
    afListOptions = afListOptions || {
      query: { orderByChild: 'updatedAt' },
    };
    return this.afDatabase.list('journeys', afListOptions).map((snapshot: any[]) => (
      snapshot.map(journeyValues => new Journey(journeyValues))
    ));
  }

  readJourneysByOwner(ownerUid: string): Observable<Journey[]> {
    return this.readJourneys({
      query: { orderByChild: 'owner', equalTo: ownerUid }
    });
  }

  readJourney(uid: string): Observable<Journey> {
    return this.afDatabase.object(`journeys/${uid}`).map((snapshot: any) => (
      new Journey(snapshot)
    ));
  }

  updateJourney(journey: Journey): Observable<Journey> {
    const { $key, ...unkeyedJourney } = journey; // Remove $key temporarily (forbidden by firebase).
    const journeys = this.afDatabase.object(`journeys/${$key}`);
    const setPromise = journeys.set(unkeyedJourney);
    return Observable.fromPromise(setPromise).map(() => journey );
  }

  updateJourneyWithCoverFile(journey: Journey, cover?: File): Observable<Journey> {
    if (!cover) {
      return this.updateJourney(journey);
    }
    return this.fileService.createImage(cover)
      .flatMap((snapshot: firebase.storage.UploadTaskSnapshot) => {
        const newJourney = new Journey({ // Don't modify the original subject.
          ...journey,
          coverURL: snapshot.downloadURL,
        });
        return this.updateJourney(newJourney);
      });
  }

  /**
   * Deletes journey and its stories.
   * @param uid journey uid.
   */
  deleteJourney(journey: Journey): Observable<void> {
    const dbObject = this.afDatabase.object(`journeys/${journey.$key}`);
    const removeJourney: firebase.Promise<void> = dbObject.remove();
    const removeCover: Observable<void> = journey.coverURL
      ? this.fileService.deleteFileByDownloadURL(journey.coverURL)
      : Observable.of(null);
    const storiesObs: Observable<Story[]> = this.storyService.readStories(journey.$key).first();
    const removeStories: Observable<void[]> = storiesObs.flatMap((stories: Story[]) => {
      const remove: Observable<void>[] = stories.length > 0
        ? stories.map((story: Story) => this.storyService.deleteStory(story))
        : [Observable.of(null)];
      return Observable.forkJoin(...remove);
    });

    return Observable.forkJoin(removeJourney, removeCover, removeStories).map(() => {});
  }
}
