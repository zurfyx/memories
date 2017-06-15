import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { StoryDetailEditComponent } from '../story-detail-edit.component';

@Component({
  selector: 'app-story-detail-title',
  templateUrl: 'story-detail-title.component.html',
  styleUrls: ['story-detail-title.component.scss'],
})
export class StoryDetailTitleComponent extends StoryDetailEditComponent {
  newTitle: string;

  titleChange(event: Event) {
    this.setPending();
    this.newTitle = (event.target as HTMLInputElement).value;
  }

  cleanup(): void {
    this.newTitle = undefined;
    this.unsetPending();
  }

  updateStory(): Observable<void> {
    if (this.newTitle !== undefined) {
      this.story.title = this.newTitle;
    }
    this.unsetPending();
    return Observable.of(null);
  }
}
