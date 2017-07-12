import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Beacon, BeaconService } from 'eddystone-web-bluetooth';

@Component({
  selector: 'app-pw-new-save',
  templateUrl: 'pw-new-save.component.html',
  styleUrls: ['pw-new-save.component.scss'],
})
export class PwNewSaveComponent {
  beaconForm: FormGroup;
  isSubmitting = false;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.beaconForm = this.formBuilder.group({
      title: ['Memories', Validators.required],
      description: [''],
    });
  }

  save() {
    this.isSubmitting = true;

    this.isSubmitting = false;
  }
}
