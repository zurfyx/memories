import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { LiquidGalaxyServer } from 'liquid-galaxy';

import {
  User,
  Story,
} from '../../shared';
import {
  CastService,
  KmlService,
} from '../../core';

@Component({
  selector: 'app-journey-detail-cast',
  templateUrl: 'journey-detail-cast.component.html',
})
export class JourneyDetailCastComponent implements OnInit, OnChanges {
  @Input() stories: Story[];
  @Input() owner: User;

  castServer: BehaviorSubject<LiquidGalaxyServer>;
  castingState = 0;

  constructor(
    private castService: CastService,
    private kmlService: KmlService,
  ) {
    this.castServer = this.castService.active;
  }

  ngOnInit() {
    this.cast();
  }

  ngOnChanges() {
    // Recast on param changes.
    this.cast();
  }

  cast() {
    const server: LiquidGalaxyServer = this.castServer.value;
    const sortedStories = this.sortStoriesByDateAsc(this.stories);
    const kml = this.kmlService.tour(sortedStories, this.owner);
    Observable.fromPromise(server.writeKML(kml))
      .subscribe(() => {
        // Liquid Galaxy tick time to read new sent KML files is ~1s.
        setTimeout(() => this.castPlayTour(), 1000);
      });
  }

  sortStoriesByDateAsc(stories: Story[]): Story[] {
    return stories.sort((a, b) => (a.dateStart - b.dateStart));
  }

  async castPlayTour() {
    const server: LiquidGalaxyServer = this.castServer.value;
    await server.writeQuery('playtour=main');
    this.castingState = 1;
  }

  async castStopTour() {
    const server: LiquidGalaxyServer = this.castServer.value;
    await server.writeQuery('exittour=main');
    this.castingState = 2;
  }
}
