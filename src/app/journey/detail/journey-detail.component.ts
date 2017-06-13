import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

import {
  Journey,
  User,
  UserService,
  Story,
  StoryService,
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private storyService: StoryService,
  ) {
    this.route.data.subscribe((params: { journey: Journey }) => {
      this.journey = params.journey;
    });
  }

  ngOnInit() {
    this.userService.readUser(this.journey.owner, ['photoURL']).subscribe((owner: User) => {
      this.owner = owner;
    });
    this.storyService.readStories(this.journey.$key).subscribe((stories: Story[]) => {
      this.stories = stories;
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
}
