import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { LiquidGalaxyServer } from 'liquid-galaxy';

import {
  User,
  Story,
} from '../../../shared';
import {
  StoryService,
  KmlService,
} from '../../../core';
import { CastService } from '../../../core';

@Component({
  selector: 'app-story-detail-cast',
  templateUrl: 'story-detail-cast.component.html',
})
export class StoryDetailCastComponent implements OnInit, OnChanges {
  @Input() story: Story;
  @Input() owner: User;

  castServer: BehaviorSubject<LiquidGalaxyServer>;
  castingState = 0;

  constructor(
    private storyService: StoryService,
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
    const server: LiquidGalaxyServer = this.castService.active.value;

    // We'll focus on the current story, but we'll show other story placemarks in the same journey
    // as well.
    this.storyService.readStories(this.story.journey)
      .first()
      .flatMap((stories: Story[]) => {
        const kml = this.kmlService.soloTour(stories, this.story, this.owner);
        return Observable.fromPromise(server.writeKML(kml));
      })
      .subscribe(() => {
        // Liquid Galaxy tick time to read new sent KML files is ~1s.
        setTimeout(() => this.castPlayTour(), 1000);
      });
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
