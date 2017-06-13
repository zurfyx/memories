import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  User,
  UserService,
  Story,
} from '../../shared';

@Component({
  selector: 'app-story-detail',
  templateUrl: 'story-detail.component.html',
  styleUrls: ['story-detail.component.scss'],
})
export class StoryDetailComponent implements OnInit {
  story: Story;
  owner: User; // Story owner.

  isEditing = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
  ) {
    this.route.data.subscribe((params: { story: Story }) => {
      this.story = params.story;
    });
  }

  ngOnInit() {
    this.userService.readUser(this.story.owner, ['photoURL']).subscribe((user: User) => {
      this.owner = user;
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  submitStory(story: Story) {

  }
}
