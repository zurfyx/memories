import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

import { Story } from '../../shared';
import { FileService } from './file.service';
import { IdService } from './id.service';

@Injectable()
export class StoryService {

  constructor(
    private afDatabase: AngularFireDatabase,
    private fileService: FileService,
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

  deleteStory(story: Story): Observable<void> {
    const dbObject = this.afDatabase.object(`stories/${story.$key}`);
    const removeStory: firebase.Promise<void> = dbObject.remove();
    const removeCover: Observable<void> = story.coverURL
      ? this.fileService.deleteFileByDownloadURL(story.coverURL)
      : Observable.of(null);
    const removePhotos: Observable<void>[] = Object.keys(story.photos || []).map((photoId) => (
       this.fileService.deleteFileByDownloadURL(story.photos[photoId].url)
    ));
    return Observable.forkJoin(removeStory, removeCover, ...removePhotos).map(() => {});
  }
}
