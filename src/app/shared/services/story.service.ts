import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import shortid from 'shortid';

import { Story } from '../models';

@Injectable()
export class StoryService {

  constructor(
    private afDatabase: AngularFireDatabase,
  ) { }

  createStory(story: Story): Observable<void> {
    const storyId = shortid.generate();
    const stories = this.afDatabase.object(`stories/${storyId}`);
    const setPromise = stories.set(story);
    return Observable.fromPromise(setPromise);
  }
}
