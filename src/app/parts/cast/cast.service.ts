import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { LiquidGalaxyServer } from 'liquid-galaxy';

@Injectable()
export class CastService {
  // The solo (or no) server that has a connection established.
  active: BehaviorSubject<LiquidGalaxyServer> = new BehaviorSubject(undefined);

  constructor() { }

  setActive(server: LiquidGalaxyServer) {
    this.unsetActive();
    this.active.next(server);
  }

  unsetActive() {
    const activeServer: LiquidGalaxyServer = this.active.value;
    if (activeServer) {
      activeServer.writeQuery('exittour=*');
      activeServer.cleanKml();
    }
    this.active.next(null);
  }
}
