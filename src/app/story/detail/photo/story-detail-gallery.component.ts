import { Component, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';

import { MediaType } from './media-type';

@Component({
  selector: 'app-story-detail-gallery',
  templateUrl: 'story-detail-gallery.component.html',
  styleUrls: ['story-detail-gallery.component.scss'],
})
export class StoryDetailGalleryComponent {
  media: GalleryMedia;
  selectedIndex: number;

  constructor(
    @Inject(MD_DIALOG_DATA) public data: GalleryData,
  ) {
    this.media = data.media;
    this.selectedIndex = data.selectedIndex;
  }

  next() {
    this.selectedIndex = this.mod(this.selectedIndex + 1, this.media.length);

  }

  previous() {
    this.selectedIndex = this.mod(this.selectedIndex - 1, this.media.length);
  }

  /**
   * https://stackoverflow.com/a/1082938/2013580
   */
  mod(x, n) {
    return (x % n + n) % n;
  }
}

interface GalleryData {
  media: GalleryMedia,
  selectedIndex: number,
};

type GalleryMedia = [{
  url: string,
  type: MediaType,
}];
