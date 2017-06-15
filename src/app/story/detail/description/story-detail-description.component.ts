import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { StoryDetailEditComponent } from '../story-detail-edit.component';

@Component({
  selector: 'app-story-detail-description',
  templateUrl: 'story-detail-description.component.html',
  styleUrls: ['story-detail-description.component.scss'],
})
export class StoryDetailDescriptionComponent extends StoryDetailEditComponent {
  newDescription: string;

  descriptionChange(event: Event) {
    this.setPending();
    this.newDescription = (event.target as HTMLInputElement).value;
  }

  cleanup(): void {
    this.newDescription = undefined;
    this.unsetPending();
  }

  updateStory(): Observable<void> {
    if (this.newDescription !== undefined) {
      this.story.description = this.newDescription;
    }
    this.unsetPending();
    return Observable.of(null);
  }
}
