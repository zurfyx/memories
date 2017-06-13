import { Component, OnInit, Input } from '@angular/core';

import { Story } from '../../../shared';

@Component({
  selector: 'app-story-detail-banner',
  templateUrl: 'story-detail-banner.component.html',
})
export class StoryDetailBannerComponent {
  @Input() story: Story;
  @Input() isEditing: boolean;
}
