import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';

import { Comment } from '../models';

@Injectable()
export class CommentService {

  constructor(
    private afDatabase: AngularFireDatabase,
  ) { }

  createComment(comment: Comment): Observable<Comment> {
    const pushPromise = this.afDatabase.list('comments').push(comment);
    return Observable.fromPromise(pushPromise);
  }

  readComments(storyId: string): Observable<Comment[]> {
    const afListOptions = {
      query: { orderByChild: 'story', equalTo: storyId },
    };
    return this.afDatabase.list('comments', afListOptions).map((snapshot: any[]) => (
      snapshot.map(commentValues => new Comment(commentValues))
    ));
  }
}
