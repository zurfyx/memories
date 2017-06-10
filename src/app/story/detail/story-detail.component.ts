import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  User,
  UserService,
} from '../../shared';

@Component({
  selector: 'app-story-detail',
  templateUrl: 'story-detail.component.html',
  styleUrls: ['story-detail.component.scss'],
})
export class StoryDetailComponent implements OnInit {
  story: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
  ) {
    this.route.data.subscribe((params: { story: any }) => {
      this.story = params.story;
    });
  }

  ngOnInit() {
  }
}
