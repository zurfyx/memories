import { Injectable } from '@angular/core';
import { Resolve, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import {
  Journey,
  JourneyService,
} from '../shared';

@Injectable()
export class JourneyResolver implements Resolve<Journey> {

  constructor(
    private router: Router,
    private journeyService: JourneyService,
    private http: Http,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<any> {
    const journeyUid = route.params['uid'];
    return this.journeyService.readJourney(journeyUid).first()
      .catch((error) => this.router.navigateByUrl('/'));
  }
}
