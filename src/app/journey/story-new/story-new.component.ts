import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

import {
  Journey,
  Story,
  StoryService,
} from '../../shared';

@Component({
  moduleId: module.id,
  selector: 'app-story-new',
  templateUrl: 'story-new.component.html',
})
export class StoryNewComponent {
  @Input() journey: Journey;
  @Output() success: EventEmitter<void> = new EventEmitter<void>();
  @Output() fail: EventEmitter<void> = new EventEmitter<void>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  storyForm: FormGroup;
  isSubmitting = false;

  constructor(
    private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    private storyService: StoryService,
  ) {
    this.storyForm = this.formBuilder.group({
      title: ['', Validators.required],
    });
  }

  submitStoryForm() {
    this.isSubmitting = true;

    const title: string = this.storyForm.value['title'];

    this.afAuth.authState
      .first()
      .flatMap((user: firebase.User) => {
        const userUid = user.uid;
        const story: Story = new Story({
          title,
          journey: this.journey.$key,
          owner: userUid,
          updatedAt: firebase.database.ServerValue.TIMESTAMP,
        });
        return this.storyService.createStory(story);
      })
      .subscribe(
        _ => {
          this.success.emit();
          this.storyForm.reset();
          this.isSubmitting = false;
        },
        error => {
          this.fail.emit();
          console.error(error);
          window.alert('An error has ocurred.');
          this.isSubmitting = false;
        }
      );
  }

  cancelStoryForm() {
    this.cancel.emit();
  }
}
