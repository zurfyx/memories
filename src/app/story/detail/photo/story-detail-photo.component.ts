import { Component, ViewChild, ElementRef } from '@angular/core';
import { SafeStyle } from '@angular/platform-browser';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MdDialog } from '@angular/material';
import { Observable } from 'rxjs/Rx';
import uuid from 'uuid/v4';

import { Validators } from './validators';

import {
  FormUtils,
  SafeUrlPipe,
} from '../../../shared';
import { FileService } from '../../../core';
import { StoryDetailEditComponent } from '../story-detail-edit.component';
import { StoryDetailGalleryComponent } from './story-detail-gallery.component';
import { MediaType } from './media-type';

@Component({
  selector: 'app-story-detail-photo',
  templateUrl: 'story-detail-photo.component.html',
  styleUrls: ['story-detail-photo.component.scss'],
})
export class StoryDetailPhotoComponent extends StoryDetailEditComponent {
  @ViewChild('addPhotoInput') addPhotoInput: ElementRef;

  // New photos that haven't been saved yet.
  newPhotos: { file: File, safeStyle: SafeStyle}[] = [];

  // Photos marked to be deleted (which won't be deleted until the editing is over).
  pendingDelete: { url: string, title?: string }[] = [];

  videoForm: FormGroup;
  isVideoFormVisible = false;

  // New videos.
  // If the variable remains as undefined, no modifications will be done. Otherwise, the final Story
  // object will have its videos replaced by this one when the update is over.
  newVideos: {
    [uid: string]: { id: string, type: string };
  };

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MdDialog,
    private imageService: FileService,
    private safeUrlPipe: SafeUrlPipe,
  ) {
    super();

    this.videoForm = this.formBuilder.group({
      url: ['', Validators.isVideo],
    });
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
          safeStyle: safeUrl,
        });
      });
    });
  }

  executeAddPhoto() {
    this.addPhotoInput.nativeElement.click();
  }

  initializeNewVideos() {
    if (this.newVideos !== undefined) {
      throw new Error('newVideos has already been initialized');
    }
    this.newVideos = this.story.videos || {};
  }

  toggleVideoForm() {
    this.isVideoFormVisible = !this.isVideoFormVisible;
  }

  submitVideoForm() {
    this.setPending();
    const url: string = this.videoForm.value['url'];
    const id = this.extractVideoId(url);

    if (this.newVideos === undefined) {
      this.initializeNewVideos();
    }
    this.newVideos[uuid()] = { id, type: 'youtube' };

    this.videoForm.setValue({ url: '' });
  }

  extractVideoId(url: string) {
    // https://stackoverflow.com/a/27728417
    const REGEX = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
    return url.match(REGEX)[1];
  }

  cleanup(): void {
    this.newPhotos = [];
    this.pendingDelete = [];
    this.videoForm.setValue({ url: '' });
    this.newVideos = undefined;
    this.unsetPending();
  }

  updateStory(): Observable<void> {
    // Add videos to the story object. Contrary to photos, we only save their id.
    if (this.newVideos !== undefined) {
      this.story.videos = this.newVideos;
    }

    if (!this.story.photos) {
      this.story.photos = {};
    }

    // Delete "pendingDelete" photos.
    const removeImages: Observable<void>[] = [];
    this.pendingDelete.forEach((pendingDeletePhoto) => {
      const photoId = Object.keys(this.story.photos).filter(id => this.story.photos[id] === pendingDeletePhoto)[0];
      removeImages.push(this.imageService.deleteFileByDownloadURL(this.story.photos[photoId].url));
      delete this.story.photos[photoId];
    });

    // Create new photos.
    const createImages = this.newPhotos.map(photo => this.imageService.createImage(photo.file));
    const emptyObs = Observable.of(null); // To prevent waiting indefinetely just because there are
                                          // no new images to create nor remove.
    return Observable.forkJoin(...createImages, ...removeImages, emptyObs).map((images: firebase.storage.UploadTaskSnapshot[]) => {
      images.splice(createImages.length, images.length - createImages.length); // Remove non-new photos.
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

  /**
   * Story photos that are NOT pending deletion.
   * This method should be used to display to current stored photos.
   */
  storyPhotos(): { url: string, title?: string }[] {
    if (!this.story.photos) {
      return [];
    }
    return Object.keys(this.story.photos)
      .map(key => this.story.photos[key])
      .filter(photo => !this.pendingDelete.includes(photo));
  }

  storyVideos(): { id: string, type: string }[] {
    if (this.newVideos !== undefined) {
      return Object.keys(this.newVideos).map(key => this.newVideos[key]);
    }
    if (this.story.videos) {
      return Object.keys(this.story.videos).map(key => this.story.videos[key]);
    }
    return [];
  }

  /**
   * Delete a photo that has been previously stored.
   */
  deleteStoryPhoto(photo: { url: string, title?: string }) {
    this.setPending();
    this.pendingDelete = this.pendingDelete.concat(photo);
  }

  /**
   * Delete a new photo that hasn't been stored.
   */
  deleteNewStoryPhoto(photo) {
    this.newPhotos = this.newPhotos.filter(newPhoto => newPhoto !== photo);
  }

  deleteVideo(video: { id: string, type: string }) {
    if (this.newVideos === undefined) {
      this.initializeNewVideos();
    }
    Object.keys(this.newVideos).forEach((newVideoUid) => {
      if (this.newVideos[newVideoUid] === video) {
        delete this.newVideos[newVideoUid];
      }
    });
  }

  openGallery(selectedIndex = 0) {
    if (this.isEditing()) {
      return;
    }
    const videos = this.storyVideos().map(video => ({
      url: video.id,
      type: MediaType.Video,
    }));
    const photos = this.storyPhotos().map(photo => ({
      url: photo.url,
      type: MediaType.Photo,
    }));
    const media = [].concat(videos, photos);
    this.dialog.open(StoryDetailGalleryComponent, {
      data: {
        media,
        selectedIndex,
      },
    });
  }
}
