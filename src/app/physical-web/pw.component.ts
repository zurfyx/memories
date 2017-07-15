import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk';
import { MdSort } from '@angular/material';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

import {
  Pw,
  PwService,
} from '../shared';

@Component({
  selector: 'app-pw',
  templateUrl: 'pw.component.html',
  styleUrls: ['pw.component.scss'],
})
export class PwComponent implements OnInit {
  dataSource: PwDataSource;
  displayedColumns = ['title', 'shortUrl', 'createdAt', 'beacon'];

  constructor(
    private pwService: PwService,
  ) { }

  ngOnInit() {
    const pws = this.pwService.readPws();
    const pwDataSource = new PwDataSource(pws);
    this.dataSource = pwDataSource;
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
