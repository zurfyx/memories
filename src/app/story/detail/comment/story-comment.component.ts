import { Component, OnInit, Input } from '@angular/core';

import {
  Story,
} from '../../../shared';

@Component({
  selector: 'app-story-comment',
  templateUrl: 'story-comment.component.html',
  styleUrls: ['story-comment.component.scss'],
})
export class StoryCommentComponent implements OnInit {
  @Input() story: Story;

  constructor() { }

  ngOnInit() { }
}
