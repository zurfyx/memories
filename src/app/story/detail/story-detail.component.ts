import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MdSnackBar,
  MdDialog,
} from '@angular/material';
import { Observable, Subject, BehaviorSubject, ReplaySubject } from 'rxjs/Rx';
import * as firebase from 'firebase';
import { LiquidGalaxyServer } from 'liquid-galaxy';

import {
  User,
  UserService,
  Story,
  StoryService,
  KmlService,
} from '../../shared';
import { CastService } from '../../parts/cast';
import { ConfirmComponent } from '../../parts/confirm';
import { EditState } from './edit-state';

@Component({
  selector: 'app-story-detail',
  templateUrl: 'story-detail.component.html',
  styleUrls: ['story-detail.component.scss'],
})
export class StoryDetailComponent implements OnInit, OnDestroy {
  destroy: ReplaySubject<any> = new ReplaySubject();

  story: Story;
  owner: User;

  editState = EditState.View;
  pending = new BehaviorSubject<Set<string>>(new Set());

  castServer: BehaviorSubject<LiquidGalaxyServer>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private storyService: StoryService,
    private snackBar: MdSnackBar,
    private dialog: MdDialog,
    private castService: CastService,
  ) {
    this.route.data.subscribe((params: { story: Story }) => {
      this.story = params.story;
    });
    this.castServer = this.castService.active;
  }

  ngOnInit() {
    this.storyService.readStory(this.story.$key)
      .takeUntil(this.destroy)
      .subscribe((story: Story) => {
        if (this.editState === EditState.View) {
          this.story = story;
        }
      });

    // Read current user data.
    this.userService.readUser(this.story.owner)
      .first()
      .subscribe((owner: User) => {
        this.owner = owner;
      });
  }

  ngOnDestroy() {
    this.destroy.next(true);
  }

  isActivelyEditing(): boolean {
    return this.editState === EditState.Edit;
  }

  isEditing(): boolean {
    return this.editState === EditState.Edit
        || this.editState === EditState.Cancel
        || this.editState === EditState.Save;
  }

  switchToView() {
    this.editState = EditState.View;
  }

  switchToEdit() {
    this.editState = EditState.Edit;
  }

  switchToSave() {
    this.editState = EditState.Save;
  }

  switchToCancel() {
    this.editState = EditState.Cancel;
  }

  setPending(componentName: string) {
    this.pending.value.add(componentName);
    this.pending.next(this.pending.value); // Mutated data structure. Send the same reference as a new update.
  }

  setUnpending(componentName: string) {
    this.pending.value.delete(componentName);
    this.pending.next(this.pending.value); // Mutated data structure. Send the same reference as a new update.
  }

  edit() {
    this.editState = EditState.Edit;
  }

  cancel() {
    this.editState = EditState.Cancel;

    const cancelDone = new Subject<any>();
    const stop = Observable.merge(cancelDone, this.destroy);
    this.pending
      .takeUntil(stop)
      .filter((pending: Set<string>) => pending.size === 0)
      .subscribe(() => {
        cancelDone.next(true);
        this.editState = EditState.View;
      });
  }

  save() {
    this.editState = EditState.Save;

    const saveDone = new Subject<any>();
    const stop = Observable.merge(saveDone, this.destroy);
    this.pending
      .takeUntil(stop)
      .filter((pending: Set<string>) => pending.size === 0)
      .subscribe(() => {
        saveDone.next(true);
        this.updateStory();
      });
  }

  updateStory() {
    this.story.updatedAt = firebase.database.ServerValue.TIMESTAMP;
    this.storyService.updateStory(this.story).subscribe(() => {
      this.editState = EditState.View;
      this.snackBar.open('Saved!', null, { duration: 3000 });
      this.story = new Story(this.story); // Simulate a real time update.
    });
  }

  delete() {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        title: 'Delete story',
        description: `You are about to delete "${this.story.title}".\n\nThis action cannot be undone!`,
      },
    });
    dialogRef.afterClosed().subscribe((isConfirmed: boolean) => {
      if (isConfirmed) {
        this.deleteConfirmed();
      }
    });
  }

  deleteConfirmed() {
    this.storyService.deleteStory(this.story).subscribe(
      () => {
        this.router.navigate([`/journeys/${this.story.journey}`]);
        this.snackBar.open('Deleted!', null, { duration: 3000 });
      },
      error => window.alert('An error ocurred. Story was not deleted.'),
    );
  }
}
