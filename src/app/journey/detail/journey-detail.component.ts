import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SafeStyle } from '@angular/platform-browser';
import { MdDialog, MdSnackBar } from '@angular/material';
import { Observable, Subject, BehaviorSubject, ReplaySubject } from 'rxjs/Rx';
import * as firebase from 'firebase';
import { LiquidGalaxyServer } from 'liquid-galaxy';

import {
  FormUtils,
  SafeStylePipe,
  User,
  UserService,
  Journey,
  JourneyService,
  Story,
  StoryService,
  ConfirmComponent,
  CastService,
} from '../../shared';

@Component({
  moduleId: module.id,
  selector: 'app-journey-detail',
  templateUrl: 'journey-detail.component.html',
  styleUrls: ['journey-detail.component.scss'],
})
export class JourneyDetailComponent implements OnInit, OnDestroy {
  destroy: ReplaySubject<any> = new ReplaySubject();

  journey: Journey;
  owner: User; // Journey's owner.
  stories: Story[];

  isNewStoryVisible = false;

  editState = 0; // 0 => Not editing; 1 => Actively editing; 2 => Saving.
  @ViewChild('coverInput') coverInput: ElementRef;
  newCover: File;
  newCover64: SafeStyle;
  newTitle: string;

  castServer: BehaviorSubject<LiquidGalaxyServer>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private safeStylePipe: SafeStylePipe,
    private dialog: MdDialog,
    private snackBar: MdSnackBar,
    private userService: UserService,
    private journeyService: JourneyService,
    private storyService: StoryService,
    private castService: CastService,
  ) {
    this.route.data.subscribe((params: { journey: Journey }) => {
      this.journey = params.journey;
    });
    this.castServer = this.castService.active;
  }

  ngOnInit() {
    // Real time journey updates (only when the user's not editing it).
    this.journeyService.readJourney(this.journey.$key)
      .takeUntil(this.destroy)
      .subscribe((journey: Journey) => {
        if (this.editState === 0) {
          this.journey = journey;
        }
      });

    // Read journey stories (until the page is destroyed).
    this.storyService.readStories(this.journey.$key)
      .takeUntil(this.destroy)
      .subscribe((stories: Story[]) => {
        this.stories = stories;
      });

    // Read current user data.
    this.userService.readUser(this.journey.owner)
      .first()
      .subscribe((owner: User) => {
        this.owner = owner;
      });
  }

  ngOnDestroy() {
    this.destroy.next(true);
  }

  /**
   * New story.
   */

  toggleNewStory(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    this.isNewStoryVisible = !this.isNewStoryVisible;
  }

  /**
   * Edit journey.
   */

  toggleEdit() {
    this.editState = 1;
  }

  saveEdit() {
    this.editState = 2;

    if (this.newTitle !== undefined) {
      this.journey.title = this.newTitle;
    }
    this.journey.updatedAt = firebase.database.ServerValue.TIMESTAMP;
    this.journeyService.updateJourneyWithCoverFile(this.journey, this.newCover)
      .subscribe((journey: Journey) => {
        this.journey = journey;
        this.resetEdit();
      });
  }

  cancelEdit() {
    this.resetEdit();
  }

  resetEdit() {
    this.newCover = undefined;
    this.newCover64 = undefined;
    this.newTitle = undefined;
    this.editState = 0;
  }

  executeCoverInput() {
    if (this.editState === 1) {
      this.coverInput.nativeElement.click();
    }
  }

  coverChange(event: EventTarget) {
    const files: FileList = FormUtils.getFilesFromEvent(event);
    if (files.length === 0) {
      return;
    }

    this.newCover = files[0];
    FormUtils.base64FromImageFile(this.newCover).subscribe(
      b64 => this.newCover64 = this.safeStylePipe.transform(`url(${b64})`)
    )
  }

  titleChange(event: Event) {
    this.newTitle = (event.target as HTMLInputElement).value;
  }

  /**
   * Delete journey.
   */
  delete() {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        title: 'Delete journey',
        description: `You are about to delete "${this.journey.title}".\n\nThis action cannot be undone!`,
      },
    });
    dialogRef.afterClosed().subscribe((isConfirmed: boolean) => {
      if (isConfirmed) {
        this.deleteConfirmed();
      }
    });
  }

  deleteConfirmed() {
    this.journeyService.deleteJourney(this.journey).subscribe(
      () => {
        this.router.navigate(['/journeys']);
        this.snackBar.open('Deleted!', null, { duration: 3000 });
      },
      error => window.alert('An error ocurred. Journey was not deleted.'),
    );
  }

  /**
   * Misc.
   */

  getRouterStoryPath(uid: string) {
    return [`/stories/${uid}`];
  }

  navigateToStory(uid: string) {
    const routerPath = this.getRouterStoryPath(uid);
    this.router.navigate(routerPath);
  }
}
