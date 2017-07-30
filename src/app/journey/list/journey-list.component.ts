import { Component, OnInit } from '@angular/core';
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
  journeysFiltered: Journey[];

  constructor(
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
      this.journeysFiltered = null;
      return;
    }
    this.journeysFiltered = this.journeys.filter((journey: Journey) => (
      journey.title.toLowerCase().includes(title.toLowerCase())
    ));
  }

  sortJourneysByDateDesc(journeys: Journey[]) {
    return journeys.sort((a, b) => (b.updatedAt as number) - (a.updatedAt as number));
  }
}
