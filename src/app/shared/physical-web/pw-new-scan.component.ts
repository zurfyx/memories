import { Component, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Eddystone } from 'eddystone-web-bluetooth';

@Component({
  selector: 'app-pw-new-scan',
  templateUrl: 'pw-new-scan.component.html',
  styleUrls: ['pw-new-scan.component.scss'],
})
export class PwNewScanComponent {
  @Output() beacon: EventEmitter<any> = new EventEmitter();

  eddystone: Eddystone;

  constructor() {
    this.eddystone = new Eddystone();
  }

  scan() {
    Observable.fromPromise(this.eddystone.request()).subscribe((beacon) => {
      this.beacon.emit(beacon);
    });
  }
}
