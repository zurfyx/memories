import { Component, OnInit, Input } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { Observable } from 'rxjs/Rx';

import { StoryDetailEditComponent } from '../story-detail-edit.component';

@Component({
  selector: 'app-story-detail-map',
  templateUrl: 'story-detail-map.component.html',
  styleUrls: ['story-detail-map.component.scss'],
})
export class StoryDetailMapComponent extends StoryDetailEditComponent {
  DEFAULT_LAT = 58;
  DEFAULT_LONG = -5;

  newLat: number;
  newLong: number;

  mapClick(event: MouseEvent) {
    if (!this.isActivelyEditing()) {
      return;
    }
    this.setPending();
    this.newLat = event.coords.lat;
    this.newLong = event.coords.lng;
  }

  cleanup(): void {
    this.newLat = undefined;
    this.newLong = undefined;
    this.unsetPending();
  }

  updateStory(): Observable<void> {
    if (this.newLat && this.newLong) {
      this.story.map = {
        lat: this.newLat,
        long: this.newLong,
      };
    }
    this.unsetPending();
    return Observable.of(null);
  }
}
