import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { Beacon, BeaconService } from 'eddystone-web-bluetooth';

import { UrlShortenerService } from '../services/url-shortener.service';

@Component({
  selector: 'app-pw-new-save',
  templateUrl: 'pw-new-save.component.html',
  styleUrls: ['pw-new-save.component.scss'],
})
export class PwNewSaveComponent implements OnInit {
  @Input() beacon: Beacon;
  beaconService: BeaconService;

  beaconForm: FormGroup;
  isSubmitting = false;

  constructor(
    private formBuilder: FormBuilder,
    private urlShortenerService: UrlShortenerService,
  ) {
    this.beaconForm = this.formBuilder.group({
      title: ['Memories', Validators.required],
      description: [''],
    });
  }

  ngOnInit() {
    const currentUrl = this.urlShortenerService.currentUrl();
    console.info(currentUrl);
    this.urlShortenerService.shorten(currentUrl).subscribe((shortened) => {
      console.info(shortened);
    });
    console.info(this.beacon);
    Observable.fromPromise(this.beacon.connect()).subscribe((service: BeaconService) => {
      console.info('service');
      console.info(this.beaconService);
      this.beaconService = service;
    });
  }

  save() {
    this.isSubmitting = true;

    this.isSubmitting = false;
  }
}
