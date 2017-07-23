import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import {
  Journey,
  JourneyService,
} from '../../shared';

@Component({
  moduleId: module.id,
  selector: 'app-journey-list',
  templateUrl: 'journey-list.component.html',
  styleUrls: ['journey-list.component.scss'],
})
export class JourneyListComponent implements OnInit {
  journeys: Journey[];
  showFiltered = false;
  journeysFiltered: Journey[];

  constructor(
    private router: Router,
    private journeyService: JourneyService,
  ) { }

  ngOnInit() {
    this.journeyService.readJourneys().subscribe((journeys: Journey[]) => {
      this.journeys = this.sortJourneysByDateDesc(journeys);
    });
  }

  filter(event: Event) {
    const input = event.target as HTMLInputElement;
    const title = input.value;
    if (title === '') {
      this.showFiltered = false;
      return;
    }
    this.showFiltered = true;
    this.journeyService.readJourneysByTitle(title).first().subscribe((journeys: Journey[]) => {
      this.journeysFiltered = this.sortJourneysByDateDesc(journeys);
    });
  }

  sortJourneysByDateDesc(journeys: Journey[]) {
    return journeys.sort((a, b) => (b.updatedAt as number) - (a.updatedAt as number));
  }

  getRouterStoryPath(uid: string) {
    return [`/journeys/${uid}`];
  }

  navigateToJourney(uid: string) {
    const routerPath = this.getRouterStoryPath(uid);
    this.router.navigate(routerPath);
  }
}
