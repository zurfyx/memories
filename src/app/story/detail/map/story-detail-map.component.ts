import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-story-detail-map',
  templateUrl: 'story-detail-map.component.html',
})
export class StoryDetailMapComponent {
  @Input() story;
  @Input() isEditing;
}
