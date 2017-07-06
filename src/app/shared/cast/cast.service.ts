import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { LiquidGalaxyServer } from 'liquid-galaxy';

@Injectable()
export class CastService {
  // The solo (or no) server that has a connection established.
  active: BehaviorSubject<LiquidGalaxyServer> = new BehaviorSubject(undefined);

  constructor() { }

  setActive(server: LiquidGalaxyServer) {
    this.active.next(server);
  }
}
