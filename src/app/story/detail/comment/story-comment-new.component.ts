import { Component, OnInit, Input } from '@angular/core';

import {
  Story,
  StoryService,
} from '../../../shared';

@Component({
  selector: 'app-story-comment-new',
  templateUrl: 'story-comment-new.component.html',
  styleUrls: ['story-comment-new.component.scss'],
})
export class StoryCommentNewComponent implements OnInit {
  @Input() story: Story;

  constructor() { }

  ngOnInit() { }
}
