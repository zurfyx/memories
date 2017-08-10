import { Directive, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ReplaySubject } from 'rxjs/Rx';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Directive({ selector: '[appShowOnSignedIn]' })
export class ShowOnSignedInDirective implements OnInit, OnDestroy {
  destroy: ReplaySubject<any> = new ReplaySubject();

  constructor(
    private element: ElementRef,
    private angularFireAuthService: AngularFireAuth
  ) { }

  ngOnInit() {
    this.angularFireAuthService.authState
      .takeUntil(this.destroy)
      .subscribe((user: firebase.User) => {
        this.toggleDisplay(!!user);
      });
  }

  ngOnDestroy() {
    this.destroy.next(true);
  }

  toggleDisplay(display?: boolean) {
    const htmlElement = this.element.nativeElement as HTMLElement;
    htmlElement.style.display = !display && 'none';
  }
}
