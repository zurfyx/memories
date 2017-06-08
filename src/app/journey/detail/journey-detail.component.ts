import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  Journey,
  JourneyService,
} from '../../shared';

@Component({
  moduleId: module.id,
  selector: 'app-journey-detail',
  templateUrl: 'journey-detail.component.html',
})
export class JourneyDetailComponent implements OnInit {
  journey: Journey;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.route.data.subscribe((params: { journey: Journey }) => {
      this.journey = params.journey;
    });
  }

  ngOnInit() { }
}
