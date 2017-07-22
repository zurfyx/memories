import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase';

import {
  Story,
  Comment,
  CommentService,
} from '../../../shared';

@Component({
  selector: 'app-story-comment-new',
  templateUrl: 'story-comment-new.component.html',
  styleUrls: ['story-comment-new.component.scss'],
})
export class StoryCommentNewComponent {
  @Input() story: Story;

  form: FormGroup;
  isSubmitting = false;
  hasJustSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    private commentService: CommentService,
  ) {
    this.form = this.formBuilder.group({
      description: ['', Validators.required],
    })
  }

  submitForm() {
    this.isSubmitting = true;

    const description: string = this.form.value['description'];

    this.afAuth.authState
      .first()
      .flatMap((user: firebase.User) => {
        const userUid = user.uid;
        const comment: Comment = new Comment({
          description,
          story: this.story.$key,
          owner: userUid,
          updatedAt: firebase.database.ServerValue.TIMESTAMP,
        });
        return this.commentService.createComment(comment);
      })
      .subscribe(
        (comment: Comment) => {
          this.form.reset();
          this.isSubmitting = false;
          this.toggleHasJustSubmitted();
        },
        (error) => {
          console.error(error);
          window.alert('An error has occurred.');
          this.isSubmitting = false;
        },
      )
  }

  toggleHasJustSubmitted() {
    this.hasJustSubmitted = true;

    setTimeout(() => this.hasJustSubmitted = false, 5000);
  }
}
