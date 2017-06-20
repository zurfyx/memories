import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { LiquidGalaxy, LiquidGalaxyServer } from 'liquid-galaxy';

import { CastService } from './cast.service';

@Component({
  selector: 'app-cast-to',
  templateUrl: 'cast-to.component.html',
  styleUrls: ['cast-to.component.scss'],
})
export class CastToComponent implements OnInit {
  servers: LiquidGalaxyServer[];
  active: Observable<LiquidGalaxyServer>;

  constructor(private castService: CastService) {
    this.active = castService.getActive();
  }

  ngOnInit() {
    const findServers = new LiquidGalaxy().findServers();
    findServers.then(servers => this.servers = servers);
  }

  connect(server: LiquidGalaxyServer) {
    this.castService.attemptConnect(server);
  }
}
