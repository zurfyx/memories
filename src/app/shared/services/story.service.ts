import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

import { Story } from '../models';
import { IdService } from './id.service';

@Injectable()
export class StoryService {

  constructor(
    private afDatabase: AngularFireDatabase,
    private idService: IdService,
  ) { }

  createStory(story: Story): Observable<void> {
    const storyId = this.idService.short();
    const dbObject = this.afDatabase.object(`stories/${storyId}`);
    const setPromise = dbObject.set(story);
    return Observable.fromPromise(setPromise);
  }

  readStories(journeyUid: string): Observable<Story[]> {
    const afListOptions = {
      query: {
        orderByChild: 'journey',
        equalTo: journeyUid,
      }
    };
    return this.afDatabase.list('stories', afListOptions).map((snapshot: any[]) => (
      snapshot.map(storyValues => new Story(storyValues))
    ));
  }

  readStory(uid: string): Observable<Story> {
    return this.afDatabase.object(`stories/${uid}`).map((snapshot: any) => (
      new Story(snapshot)
    ));
  }

  updateStory(story: Story): Observable<void> {
    const storyId = story.$key;
    const unkeyedStory = Object.assign({}, story);
    delete unkeyedStory.$key;
    const dbObject = this.afDatabase.object(`stories/${storyId}`);
    const setPromise = dbObject.set(unkeyedStory);
    return Observable.fromPromise(setPromise);
  }

  deleteStory(uid: string): Observable<void> {
    const dbObject = this.afDatabase.object(`stories/${uid}`);
    const removePromise = dbObject.remove();
    return Observable.fromPromise(removePromise);
  }
}
