import { Directive, OnInit, OnDestroy, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { ReplaySubject } from 'rxjs/Rx';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

/**
 * When [appShowOnSignedIn] is set to true, the element will be shown when the user is signed in.
 * Otherwise, it will remain hidden.
 * If it's set to false, the element will be shown when the user is not signed in.
 * By default it's set to true.
 */
@Directive({ selector: '[appShowOnSignedIn]' })
export class ShowOnSignedInDirective implements OnInit, OnDestroy {
  destroy: ReplaySubject<any> = new ReplaySubject();

  showOnSignedIn: boolean;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private angularFireAuthService: AngularFireAuth,
  ) { }

  @Input() set appShowOnSignedIn(value: boolean) {
    if (value === null || value === undefined) {
      this.showOnSignedIn = true;
      return;
    }
    this.showOnSignedIn = value;
  }

  ngOnInit() {
    this.toggleDisplay(false);

    this.angularFireAuthService.authState
      .takeUntil(this.destroy)
      .subscribe((user: firebase.User) => {
        this.toggleDisplay(this.showOnSignedIn ? !!user : !user);
      });
  }

  ngOnDestroy() {
    this.destroy.next(true);
  }

  toggleDisplay(display?: boolean) {
    if (display) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
