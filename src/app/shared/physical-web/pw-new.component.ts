import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Eddystone } from 'eddystone-web-bluetooth';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-pw-new',
  templateUrl: 'pw-new.component.html',
})
export class PwNewComponent {
  eddystone: Eddystone;
  activeBeacon;

  beaconForm: FormGroup;
  isSubmitting = false;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.eddystone = new Eddystone();
    this.beaconForm = this.formBuilder.group({
      title: ['Memories', Validators.required],
      description: [''],
    });
  }

  scan() {
   Observable.fromPromise(this.eddystone.request()).subscribe((beacon) => {
     this.activeBeacon = beacon;
   });
  }

  save() {
    this.isSubmitting = true;

    this.isSubmitting = false;
  }
}
