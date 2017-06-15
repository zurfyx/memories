import {
  Component,
  OnChanges,
  SimpleChanges,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { SafeStyle } from '@angular/platform-browser';
import { Observable } from 'rxjs/Rx';

import {
  FormUtils,
  ImageService,
  SafeStylePipe,
  Story,
} from '../../../shared';
import { EditState } from '../edit-state';

@Component({
  selector: 'app-story-detail-banner',
  templateUrl: 'story-detail-banner.component.html',
  styleUrls: ['story-detail-banner.component.scss'],
})
export class StoryDetailBannerComponent implements OnChanges {
  ID = 'banner';

  @Input() story: Story;
  @Input() editState;
  @Output() pending = new EventEmitter<void>();
  @Output() unpending = new EventEmitter<void>();

  @ViewChild('coverInput') coverInput: ElementRef;

  newCover: File;
  newCover64: SafeStyle;

  constructor(
    private imageService: ImageService,
    private safeStylePipe: SafeStylePipe,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    const editState = changes['editState'] && changes['editState'].currentValue;
    if (editState === EditState.Save) {
      this.updateStory().subscribe(() => this.cleanup());
    } else if (editState === EditState.Cancel) {
      this.cleanup();
    }
  }

  setPending() {
    this.pending.emit();
  }

  unsetPending() {
    this.unpending.emit();
  }

  isEditing(): boolean {
    return this.editState === EditState.Edit
        || this.editState === EditState.Cancel
        || this.editState === EditState.Save;
  }

  executeCoverInput() {
    if (this.editState === EditState.Edit) {
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
    this.unsetPending();
    this.coverInput.nativeElement.value = '';
    this.newCover = undefined;
    this.newCover64 = undefined;
  }

  updateStory(): Observable<void> {
    if (!this.newCover) {
      this.unsetPending();
      return;
    }

    // TODO: Delete current cover.
    return this.imageService.createImage(this.newCover).map((image) => {
      this.story.coverURL = image.downloadURL;
      this.unsetPending();
    });
  }
}
