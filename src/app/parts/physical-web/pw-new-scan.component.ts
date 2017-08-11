import { Component, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Eddystone, Beacon } from 'eddystone-web-bluetooth';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-pw-new-scan',
  templateUrl: 'pw-new-scan.component.html',
  styleUrls: ['pw-new-scan.component.scss'],
})
export class PwNewScanComponent {
  @Output() beacon: EventEmitter<any> = new EventEmitter();

  eddystone: Eddystone;
  user: Observable<firebase.User>;

  constructor(afAuth: AngularFireAuth) {
    this.eddystone = new Eddystone();
    this.user = afAuth.authState;
  }

  scan() {
    Observable.fromPromise(this.eddystone.request()).subscribe((beacon: Beacon) => {
      this.beacon.emit(beacon);
    });
  }
}
