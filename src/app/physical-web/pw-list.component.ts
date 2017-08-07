import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataSource } from '@angular/cdk';
import { MdSort } from '@angular/material';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs/Rx';

import {
  Pw,
  PwService,
} from '../shared';

@Component({
  selector: 'app-pw-list',
  templateUrl: 'pw-list.component.html',
  styleUrls: ['pw-list.component.scss'],
})
export class PwListComponent implements OnInit, OnDestroy {
  destroy: ReplaySubject<any> = new ReplaySubject();

  dataSource: PwDataSource;
  displayedColumns = ['title', 'shortUrl', 'createdAt', 'beacon'];

  hasEntries: boolean;

  constructor(
    private pwService: PwService,
  ) { }

  ngOnInit() {
    this.dataSource = new PwDataSource(this.pwService.readPws());
    this.dataSource.connect()
      .takeUntil(this.destroy)
      .subscribe((pws: Pw[]) => this.hasEntries = pws.length !== 0);
  }

  ngOnDestroy() {
    this.destroy.next(true);
  }
}

class PwDataSource extends DataSource<Pw> {
  constructor(private pws: Observable<Pw[]>) {
    super();
  }

  connect(): Observable<Pw[]> {
    return this.pws;
  }

  disconnect() { }
}
