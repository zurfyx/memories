import { Injectable } from '@angular/core';
import { Resolve, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { Journey } from '../shared';
import { JourneyService } from '../core';

@Injectable()
export class JourneyResolver implements Resolve<Journey> {

  constructor(
    private router: Router,
    private journeyService: JourneyService,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<Journey> {
    const journeyUid = route.params['uid'];
    return this.journeyService.readJourney(journeyUid).first()
      .catch((error) => this.router.navigateByUrl('/'));
  }
}
