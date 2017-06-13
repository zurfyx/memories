import { Component, OnInit, Input } from '@angular/core';

import { Story } from '../../../shared';

@Component({
  selector: 'app-story-detail-title',
  templateUrl: 'story-detail-title.component.html',
  styleUrls: ['story-detail-title.component.scss'],
})
export class StoryDetailTitleComponent {
  @Input() story: Story;
  @Input() isEditing: boolean;
}
