import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { LiquidGalaxyServer } from 'liquid-galaxy';

import { CastService } from './cast.service';

@Component({
  selector: 'app-casting',
  templateUrl: 'casting.component.html',
  styleUrls: ['casting.component.scss'],
})
export class CastingComponent implements OnChanges {
  @Input() state = 0; // 0 => Not ready (kml not uploaded).
                      // 1 => Tour playing.
                      // 2 => Tour stopped / not playing.
  @Output() playTour: EventEmitter<any> = new EventEmitter();
  @Output() stopTour: EventEmitter<any> = new EventEmitter();

  // Actions such as playTour or stopTour might take a while to finalize, we'll display a loading
  // spin until we get the new state.
  pendingStateUpdate = false;

  server: BehaviorSubject<LiquidGalaxyServer>;

  constructor(private castService: CastService) {
    this.server = this.castService.active;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.pendingStateUpdate = false;
  }

  executePlayTour() {
    this.pendingStateUpdate = true;
    this.playTour.emit();
  }

  executeStopTour() {
    this.pendingStateUpdate = true;
    this.stopTour.emit();
  }
}
