import { Injectable } from '@angular/core';
import { Resolve, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { Story } from '../shared';
import { StoryService } from '../core';

@Injectable()
export class StoryResolver implements Resolve<any> {

  constructor(
    private router: Router,
    private storyService: StoryService,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<Story> {
    const storyUid = route.params['uid'];
    return this.storyService.readStory(storyUid).first()
      .catch((error) => this.router.navigateByUrl('/'));
  }
}
