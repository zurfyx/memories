import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SafeStyle } from '@angular/platform-browser';
import { MdDialog } from '@angular/material';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
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
  CastService,
  KmlService,
  ConfirmComponent,
} from '../../shared';

@Component({
  moduleId: module.id,
  selector: 'app-journey-detail',
  templateUrl: 'journey-detail.component.html',
  styleUrls: ['journey-detail.component.scss'],
})
export class JourneyDetailComponent implements OnInit {
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
  castingState = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private safeStylePipe: SafeStylePipe,
    private dialog: MdDialog,
    private userService: UserService,
    private journeyService: JourneyService,
    private storyService: StoryService,
    private castService: CastService,
    private kmlService: KmlService,
  ) {
    this.route.data.subscribe((params: { journey: Journey }) => {
      this.journey = params.journey;
    });
    this.castServer = this.castService.active;
  }

  /**
   * 1. Read journey owner information.
   * 2. Read journey stories.
   * 3. Cast stories into the casting device (if available).
   */
  ngOnInit() {
    this.storyService.readStories(this.journey.$key)
      .flatMap((stories: Story[]) => {
        this.stories = stories;
        return this.userService.readUser(this.journey.owner);
      })
      .flatMap((owner: User) => {
        this.owner = owner;
        // Cast new stories (if a casting serving is active).
        return this.castService.active;
      })
      .subscribe((server: LiquidGalaxyServer) => {
        if (server) {
          this.cast();
        }
      });
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
      () => this.router.navigate(['/journeys']),
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

  cast() {
    const server: LiquidGalaxyServer = this.castServer.value;
    const kml = this.kmlService.tour(this.stories, this.owner);
    Observable.fromPromise(server.writeKML(kml))
      .subscribe(() => {
        // Liquid Galaxy tick time to read new sent KML files is ~1s.
        setTimeout(() => this.castPlayTour(), 1000);
      });
  }

  async castPlayTour() {
    const server: LiquidGalaxyServer = this.castServer.value;
    await server.writeQuery('playtour=main');
    this.castingState = 1;
  }

  async castStopTour() {
    const server: LiquidGalaxyServer = this.castServer.value;
    await server.writeQuery('exittour=main');
    this.castingState = 2;
  }
}
