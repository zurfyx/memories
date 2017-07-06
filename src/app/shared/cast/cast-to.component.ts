import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { LiquidGalaxy, LiquidGalaxyServer } from 'liquid-galaxy';

import { CastService } from './cast.service';

@Component({
  selector: 'app-cast-to',
  templateUrl: 'cast-to.component.html',
  styleUrls: ['cast-to.component.scss'],
})
export class CastToComponent implements OnInit {
  servers: LiquidGalaxyServer[];
  active: BehaviorSubject<LiquidGalaxyServer>;

  constructor(private castService: CastService) {
    this.active = castService.active;
  }

  ngOnInit() {
    const findServers = new LiquidGalaxy().findServers();
    findServers.then(servers => {
      this.servers = servers;
    });
  }

  setActive(server: LiquidGalaxyServer) {
    this.castService.setActive(server);
  }
}
