import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
export class JourneyNewComponent implements OnInit {
  journeyForm: FormGroup;
  isSubmitting = false;

  coverResult: File;
  coverResultBase64: string;

  @ViewChild('coverInput') coverInput: ElementRef;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private journeyService: JourneyService,
  ) {
    this.journeyForm = this.formBuilder.group({
      title: [''],
    });
  }

  ngOnInit() { }

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
    const journey: Journey = new Journey({ title });

    this.journeyService.createJourneyWithCoverFile(journey, this.coverResult)
      .subscribe(
        _ => window.alert('Done!'),
        error => window.alert('An error has occurred.'),
      );
  }
}
