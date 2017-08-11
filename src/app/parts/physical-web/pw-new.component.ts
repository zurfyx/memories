import { Component } from '@angular/core';
import { Beacon } from 'eddystone-web-bluetooth';

@Component({
  selector: 'app-pw-new',
  templateUrl: 'pw-new.component.html',
  styleUrls: ['pw-new.component.scss'],
})
export class PwNewComponent {
  step = 0; // 0 => scan; 1 => save; 2 => complete.

  beacon: Beacon;

  constructor() { }

  // Step 0 -> 1.
  setBeacon(beacon: Beacon) {
    this.beacon = beacon;
    this.nextStep();
  }

  nextStep() {
    this.step += 1;
  }
}
