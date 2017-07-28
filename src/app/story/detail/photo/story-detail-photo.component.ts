import { Component, ViewChild, ElementRef } from '@angular/core';
import { SafeStyle } from '@angular/platform-browser';
import { Observable } from 'rxjs/Rx';

import {
  FormUtils,
  FileService,
  SafeUrlPipe,
} from '../../../shared';
import { StoryDetailEditComponent } from '../story-detail-edit.component';

@Component({
  selector: 'app-story-detail-photo',
  templateUrl: 'story-detail-photo.component.html',
  styleUrls: ['story-detail-photo.component.scss'],
})
export class StoryDetailPhotoComponent extends StoryDetailEditComponent {
  @ViewChild('addPhotoInput') addPhotoInput: ElementRef;

  newPhotos: { file: File, safeStyle: SafeStyle}[] = [];

  constructor(
    private imageService: FileService,
    private safeUrlPipe: SafeUrlPipe,
  ) {
    super();
  }

  addPhoto(event: EventTarget) {
    this.setPending();
    const filesList: FileList = FormUtils.getFilesFromEvent(event);
    const files: File[] = Array.from(filesList);
    if (files.length === 0) {
      return;
    }

    const to64 = files.map(file => FormUtils.base64FromImageFile(file));
    Observable.forkJoin(to64).subscribe((b64s: string[]) => {
      b64s.forEach((b64, i) => {
        const safeUrl: SafeStyle = this.safeUrlPipe.transform(b64);
        this.newPhotos.push({
          file: files[i],
          safeStyle: b64,
        });
      });
    });
  }

  executeAddPhoto() {
    this.addPhotoInput.nativeElement.click();
  }

  cleanup(): void {
    this.newPhotos = [];
    this.unsetPending();
  }

  updateStory(): Observable<void> {
    if (this.newPhotos.length === 0) {
      this.unsetPending();
      return Observable.of(null);
    }

    if (!this.story.photos) {
      this.story.photos = {};
    }

    const createImages = this.newPhotos.map(photo => this.imageService.createImage(photo.file));
    return Observable.forkJoin(...createImages).map((images: firebase.storage.UploadTaskSnapshot[]) => {
      images.forEach((image) => {
        const url = image.downloadURL;
        this.story.photos[this.findEmptyPhotoIndex()] = { url };
      });
      this.unsetPending();
    });
  }

  /**
   * There's a limit of 10 photos per story, find an empty index number from 0-9.
   * TODO.
   */
  findEmptyPhotoIndex() {
    return Object.keys(this.story.photos).length;
  }

  storyPhotos(): { url: string, title?: string }[] {
    if (!this.story.photos) {
      return [];
    }
    return Object.keys(this.story.photos).map(key => this.story.photos[key]);
  }

  /**
   * Delete a photo that has been previously stored.
   * TODO.
   */
  deleteStoryPhoto(photo: { url: string, title?: string }) {

  }

  /**
   * Delete a new photo that hasn't been stored.
   */
  deleteNewStoryPhoto(photo) {
    this.newPhotos = this.newPhotos.filter(newPhoto => newPhoto !== photo);
  }
}
