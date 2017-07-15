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

  pws: Observable<Pw[]>; // That's not the table data. It's only used to count entries to get to
                         // know when to display the info message.

  constructor(
    private pwService: PwService,
  ) { }

  ngOnInit() {
    this.pws = this.pwService.readPws();
    this.dataSource = new PwDataSource(this.pws);
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
