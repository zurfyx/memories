import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { StoryDetailEditComponent } from '../story-detail-edit.component';

@Component({
  selector: 'app-story-detail-date',
  templateUrl: 'story-detail-date.component.html',
  styleUrls: ['story-detail-date.component.scss'],
})
export class StoryDetailDateComponent extends StoryDetailEditComponent {
  newDate: number;

  dateChange(selectedDate: Date) {
    this.setPending();
    this.newDate = selectedDate.getTime();
  }

  cleanup(): void {
    // Input will get cleared as soon as the EditState.Edit goes off due to *ngIf.
    this.newDate = undefined;
    this.unsetPending();
  }

  updateStory(): Observable<void> {
    if (this.newDate) {
      this.story.dateStart = this.newDate;
    }
    this.unsetPending();
    return Observable.of(null);
  }
}
