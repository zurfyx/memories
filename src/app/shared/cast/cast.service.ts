import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { LiquidGalaxyServer } from 'liquid-galaxy';

@Injectable()
export class CastService {
  // The solo (or no) server that has a connection established.
  private active: BehaviorSubject<LiquidGalaxyServer> = new BehaviorSubject(undefined);
  private lastAttemptedConnect: LiquidGalaxyServer;

  constructor() { }

  getActive(): Observable<LiquidGalaxyServer> {
    // Avoid the user sending updates to our original BehaviorSubject.
    return this.active.map((server: LiquidGalaxyServer) => server);
  }

  /**
   * Attempts to connect with a given server.
   * Only one connection can be kept open, previous connections will be closed.
   * @param server A LiquidGalaxyServer.
   */
  attemptConnect(server: LiquidGalaxyServer) {
    if (this.active.value) {
      // Disconnect previous connections first.
      this.attemptDisconnect();
    }

    this.lastAttemptedConnect = server;
    server.connect();
    server.onConnectionEstablished(() => this.onConnectionEstablished(server));
    server.onConnectionDropped(() => this.onConnectionDropped(server));
  }

  attemptDisconnect() {
    this.active.value.disconnect();
  }

  private onConnectionEstablished(server: LiquidGalaxyServer) {
    if (this.lastAttemptedConnect !== server) {
      // User already switched to another server. We are no longer interested in that new connection.
      server.disconnect();
      return;
    }
    this.active.next(server);
  }

  private onConnectionDropped(server: LiquidGalaxyServer) {
    if (this.active.value !== server) {
      // In some cases it might take some time to finalize the disconnection.
      // Since the user might already be connected on another server, we'll ignore that call.
      return;
    }
    this.active.next(undefined);
  }
}
