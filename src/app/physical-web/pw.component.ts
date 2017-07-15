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
})
export class PwComponent implements OnInit {
  dataSource: DataSource<Pw>;
  columns: ['id'];

  constructor(
    private pwService: PwService,
  ) {
    // this.dataSource = new DataSource();
    // this.dataSource = new BehaviorSubject<Pw>(undefined);
  }

  ngOnInit() {
    this.pwService.readPws().subscribe((pws: Pw[]) => {
      console.info(pws);
    });
  }
}

// class PwDataSource extends DataSource<Pw[]> {
//   constructor(pws: Observable<Pw[]>) {
//     super();
//   }

//   connect() { }

//   disconnect() { }
// }
