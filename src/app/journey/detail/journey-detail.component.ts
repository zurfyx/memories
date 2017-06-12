import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

import {
  Journey,
  JourneyService,
  User,
  UserService,
  Story,
  StoryService,
} from '../../shared';

@Component({
  moduleId: module.id,
  selector: 'app-journey-detail',
  templateUrl: 'journey-detail.component.html',
  styleUrls: ['journey-detail.component.scss'],
})
export class JourneyDetailComponent implements OnInit {
  journey: Journey;
  owner: User;

  storyForm: FormGroup;
  isSubmitting = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    private userService: UserService,
    private storyService: StoryService,
  ) {
    this.storyForm = this.formBuilder.group({
      title: [''],
    });
    this.route.data.subscribe((params: { journey: Journey }) => {
      this.journey = params.journey;
    });
  }

  ngOnInit() {
    this.userService.readUser(this.journey.owner, ['photoURL']).subscribe((owner: User) => {
      this.owner = owner;
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
        _ => window.alert('Done!'),
        error => {
          console.error(error);
          window.alert('An error has ocurred.');
          this.isSubmitting = false;
        }
      );
  }
}
