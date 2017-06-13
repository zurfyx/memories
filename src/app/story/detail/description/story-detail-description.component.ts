import { Component, OnInit, Input } from '@angular/core';

import { Story } from '../../../shared';

@Component({
  selector: 'app-story-detail-description',
  templateUrl: 'story-detail-description.component.html',
  styleUrls: ['story-detail-description.component.scss'],
})
export class StoryDetailDescriptionComponent {
  @Input() story: Story;
  @Input() isEditing: boolean;
}
