import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase';

import {
  User,
  UserService,
  Story,
  Comment,
  CommentService,
} from '../../../shared';

@Component({
  selector: 'app-story-detail-comment-new',
  templateUrl: 'story-detail-comment-new.component.html',
  styleUrls: ['story-detail-comment-new.component.scss'],
})
export class StoryDetailCommentNewComponent implements OnInit {
  @Input() story: Story;

  form: FormGroup;
  isSubmitting = false;
  hasJustSubmitted = false;

  user: User;

  constructor(
    private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    private userService: UserService,
    private commentService: CommentService,
  ) {
    this.form = this.formBuilder.group({
      description: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.userService.readCurrentUser().first().subscribe((user: User) => {
      this.user = user;
    });
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
