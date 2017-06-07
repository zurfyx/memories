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

  constructor(
    private journeyService: JourneyService,
  ) { }

  ngOnInit() {
    this.journeyService.readJourneys().subscribe((journeys: Journey[]) => {
      this.journeys = this.sortJourneysByDateDesc(journeys);
    });
  }

  sortJourneysByDateDesc(journeys: Journey[]) {
    return journeys.sort((a, b) => b.updatedAt - a.updatedAt);
  }
}
