import { Component } from '@angular/core';
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
    this.changeNewLocation({
      lat: event.coords.lat,
      long: event.coords.lng,
    });
  }

  currentLocation() {
    navigator.geolocation.getCurrentPosition(
      (position: Position) => this.changeNewLocation({
        lat: position.coords.latitude,
        long: position.coords.longitude,
      }),
      () => alert('Current location couldn\'t be obtained. Please, set it manually by clicking on the map.'),
    );
  }

  changeNewLocation({ lat, long }) {
    if (!this.isActivelyEditing()) {
      return;
    }
    this.setPending();
    this.newLat = lat;
    this.newLong = long;
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
