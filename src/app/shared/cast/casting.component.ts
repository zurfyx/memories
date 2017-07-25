import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { LiquidGalaxyServer } from 'liquid-galaxy';

import { CastService } from './cast.service';

@Component({
  selector: 'app-casting',
  templateUrl: 'casting.component.html',
  styleUrls: ['casting.component.scss'],
})
export class CastingComponent {
  @Input() state = 0; // 0 => Not ready (kml not uploaded).
                      // 1 => Tour playing.
                      // 2 => Tour stopped.
  @Output() playTour: EventEmitter<any> = new EventEmitter();
  @Output() stopTour: EventEmitter<any> = new EventEmitter();

  server: BehaviorSubject<LiquidGalaxyServer>;

  constructor(private castService: CastService) {
    this.server = this.castService.active;
  }

  executePlayTour() {
    this.playTour.emit();
  }

  executeStopTour() {
    this.stopTour.emit();
  }
}
