import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs/Rx';

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
export class JourneyListComponent implements OnInit, OnDestroy {
  destroy: ReplaySubject<any> = new ReplaySubject();

  journeys: Journey[];
  journeysFiltered: Journey[];

  constructor(
    private journeyService: JourneyService,
  ) { }

  ngOnInit() {
    this.journeyService.readJourneys()
      .takeUntil(this.destroy)
      .subscribe((journeys: Journey[]) => {
        this.journeys = this.sortJourneysByDateDesc(journeys);
      });
  }

  ngOnDestroy() {
    this.destroy.next(true);
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
