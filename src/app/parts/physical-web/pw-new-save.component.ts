import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { Beacon, BeaconService } from 'eddystone-web-bluetooth';
import * as firebase from 'firebase';

import { Pw } from '../../shared';
import {
  LocationService,
  FileService,
  UrlShortenerService,
  PwService,
} from '../../core';

@Component({
  selector: 'app-pw-new-save',
  templateUrl: 'pw-new-save.component.html',
  styleUrls: ['pw-new-save.component.scss'],
})
export class PwNewSaveComponent implements OnInit {
  @Input() beacon: Beacon;
  @Output() complete: EventEmitter<any> = new EventEmitter();

  beaconService: BeaconService;

  beaconForm: FormGroup;
  isSubmitting = false;

  constructor(
    private formBuilder: FormBuilder,
    private locationService: LocationService,
    private fileService: FileService,
    private urlShortenerService: UrlShortenerService,
    private pwService: PwService,
  ) {
    this.beaconForm = this.formBuilder.group({
      title: ['Memories', Validators.required],
      description: [''],
    });
  }

  ngOnInit() {
    Observable.fromPromise(this.beacon.connect()).subscribe((service: BeaconService) => {
      this.beaconService = service;
    });
  }

  /**
   * 1. Create redirect HTML with the current page location, form title and description.
   * 2. Shorten the firebase redirect endpoint.
   * 3. Save shortened url into the beacon.
   * 4. (if signed in) Save Physical Web log entry onto Firebase.
   */
  save() {
    this.isSubmitting = true;
    const title = this.beaconForm.value['title'];
    const description = this.beaconForm.value['description'];
    const redirectUri = this.locationService.currentUrl();

    this.fileService.createRedirectHtml({ title, description, redirectUri })
      .flatMap((snapshot: firebase.storage.UploadTaskSnapshot) => (
        this.urlShortenerService.shorten(snapshot.downloadURL)
      ))
      .flatMap((shortUrl: string) => (
        Observable.forkJoin(Observable.of(shortUrl), this.beaconService.writeUrl(shortUrl))
      ))
      .flatMap(([shortUrl]: [string, void]) => (
        this.saveLog({ title, description, redirectUri, shortUrl })
      ))
      .subscribe(() => {
        this.isSubmitting = false;
        this.beacon.disconnect();
        this.complete.emit();
      });
  }

  saveLog({ title, description, redirectUri, shortUrl }): Observable<Pw> {
    const pw = new Pw({
      title,
      description,
      shortUrl,
      url: redirectUri,
      beacon: {
        id: this.beacon.device.id,
        name: this.beacon.device.name,
      },
      createdAt: firebase.database.ServerValue.TIMESTAMP,
    });
    return this.pwService.createPw(pw);
  }
}
