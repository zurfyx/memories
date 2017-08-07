import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-pw',
  templateUrl: 'pw.component.html',
})
export class PwComponent implements OnInit, OnDestroy {
  destroy: ReplaySubject<any> = new ReplaySubject();

  isSignedIn: boolean;

  constructor(
    private afAuth: AngularFireAuth,
  ) { }

  ngOnInit() {
    this.afAuth.authState
      .takeUntil(this.destroy)
      .subscribe(user => this.isSignedIn = !!user);
  }

  ngOnDestroy() {
    this.destroy.next(true);
  }
}
