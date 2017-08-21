import {
  Component,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { SafeStyle } from '@angular/platform-browser';
import { Observable } from 'rxjs/Rx';

import {
  FormUtils,
  SafeStylePipe,
} from '../../../shared';
import { FileService } from '../../../core';
import { StoryDetailEditComponent } from '../story-detail-edit.component';

@Component({
  selector: 'app-story-detail-banner',
  templateUrl: 'story-detail-banner.component.html',
  styleUrls: ['story-detail-banner.component.scss'],
})
export class StoryDetailBannerComponent extends StoryDetailEditComponent {
  @ViewChild('coverInput') coverInput: ElementRef;

  newCover: File;
  newCover64: SafeStyle;

  constructor(
    private imageService: FileService,
    private safeStylePipe: SafeStylePipe,
  ) {
    super();
  }

  executeCoverInput() {
    if (this.isActivelyEditing()) {
      this.coverInput.nativeElement.click();
    }
  }

  coverChange(event: EventTarget) {
    this.setPending();
    const files: FileList = FormUtils.getFilesFromEvent(event);
    if (files.length === 0) {
      return;
    }

    this.newCover = files[0];
    FormUtils.base64FromImageFile(this.newCover).subscribe(
      b64 => this.newCover64 = this.safeStylePipe.transform(`url(${b64})`)
    );
  }

  cleanup(): void {
    this.coverInput.nativeElement.value = '';
    this.newCover = undefined;
    this.newCover64 = undefined;
    this.unsetPending();
  }

  updateStory(): Observable<void> {
    if (!this.newCover) {
      this.unsetPending();
      return Observable.of(null);
    }

    // TODO: Delete current cover.
    return this.imageService.createImage(this.newCover).map((image) => {
      this.story.coverURL = image.downloadURL;
      this.unsetPending();
    });
  }
}
