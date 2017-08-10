import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase';

import {
  FormUtils,
  Journey,
  JourneyService,
} from '../../shared';

@Component({
  selector: 'app-journey-new',
  templateUrl: 'journey-new.component.html',
  styleUrls: ['journey-new.component.scss'],
})
export class JourneyNewComponent {
  @ViewChild('coverInput') coverInput: ElementRef;

  journeyForm: FormGroup;
  isSubmitting = false;

  coverResult: File;
  coverResultBase64: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    private journeyService: JourneyService,
  ) {
    this.journeyForm = this.formBuilder.group({
      title: [''],
    });
  }

  executeCover() {
    this.coverInput.nativeElement.click();
  }

  coverChange(event: EventTarget) {
    this.coverResult = FormUtils.getFilesFromEvent(event)[0];
    FormUtils.base64FromImageFile(this.coverResult).subscribe(
      b64 => this.coverResultBase64 = b64
    );
  }

  cancelJourneyForm() {
    this.router.navigate(['/']);
  }

  submitJourneyForm() {
    this.isSubmitting = true;

    const title: string = this.journeyForm.value['title'];

    this.afAuth.authState
      .first()
      .flatMap((user: firebase.User) => {
        const userUid = user.uid;
        const journey: Journey = new Journey({
          title,
          owner: userUid,
          updatedAt: firebase.database.ServerValue.TIMESTAMP,
        });
        return this.journeyService.createJourneyWithCoverFile(journey, this.coverResult);
      })
      .subscribe(
        (journey: Journey) => this.router.navigate([`/journeys/${journey.$key}`]),
        (error) => {
          console.error(error);
          window.alert('An error has occurred.');
          this.isSubmitting = false;
        },
      );
  }
}
