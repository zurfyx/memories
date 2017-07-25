import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import * as firebase from 'firebase';
import { LiquidGalaxyServer } from 'liquid-galaxy';

import {
  Journey,
  User,
  UserService,
  Story,
  StoryService,
  CastService,
  KmlService,
} from '../../shared';

@Component({
  moduleId: module.id,
  selector: 'app-journey-detail',
  templateUrl: 'journey-detail.component.html',
  styleUrls: ['journey-detail.component.scss'],
})
export class JourneyDetailComponent implements OnInit {
  journey: Journey;
  owner: User; // Journey's owner.
  stories: Story[];

  isNewStoryVisible = false;

  castServer: BehaviorSubject<LiquidGalaxyServer>;
  castingState = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private storyService: StoryService,
    private castService: CastService,
    private kmlService: KmlService,
  ) {
    this.route.data.subscribe((params: { journey: Journey }) => {
      this.journey = params.journey;
    });
    this.castServer = this.castService.active;
  }

  /**
   * 1. Read journey owner information.
   * 2. Read journey stories.
   * 3. Cast stories into the casting device (if available).
   */
  ngOnInit() {
    this.storyService.readStories(this.journey.$key)
      .flatMap((stories: Story[]) => {
        this.stories = stories;
        return this.userService.readUser(this.journey.owner, ['photoURL', 'displayName']);
      })
      .flatMap((owner: User) => {
        this.owner = owner;
        // Cast new stories (if a casting serving is active).
        return this.castService.active;
      })
      .subscribe((server: LiquidGalaxyServer) => {
        if (server) {
          this.cast();
        }
      });
  }

  toggleNewStory(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    this.isNewStoryVisible = !this.isNewStoryVisible;
  }

  getRouterStoryPath(uid: string) {
    return [`/stories/${uid}`];
  }

  navigateToStory(uid: string) {
    const routerPath = this.getRouterStoryPath(uid);
    this.router.navigate(routerPath);
  }

  cast() {
    const server: LiquidGalaxyServer = this.castServer.value;
    const kml = this.kmlService.tour(this.stories, this.owner);
    Observable.fromPromise(server.writeKML(kml))
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
