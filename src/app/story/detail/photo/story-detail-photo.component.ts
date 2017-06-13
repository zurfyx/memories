import { Component, OnInit, Input } from '@angular/core';

import { Story } from '../../../shared';

@Component({
  selector: 'app-story-detail-photo',
  templateUrl: 'story-detail-photo.component.html',
  styleUrls: ['story-detail-photo.component.scss'],
})
export class StoryDetailPhotoComponent {
  @Input() story: Story;
  @Input() isEditing: boolean;
}
