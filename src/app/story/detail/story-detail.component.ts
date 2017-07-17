import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import * as firebase from 'firebase';
import { LiquidGalaxyServer } from 'liquid-galaxy';

import {
  User,
  UserService,
  Story,
  StoryService,
  CastService,
  KmlService,
} from '../../shared';
import { EditState } from './edit-state';

@Component({
  selector: 'app-story-detail',
  templateUrl: 'story-detail.component.html',
  styleUrls: ['story-detail.component.scss'],
})
export class StoryDetailComponent implements OnInit {
  story: Story;
  owner: User; // Story owner.

  editState = EditState.View;
  pending = new BehaviorSubject<Set<string>>(new Set());

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private storyService: StoryService,
    private snackBar: MdSnackBar,
    private castService: CastService,
    private kmlService: KmlService,
  ) {
    this.route.data.subscribe((params: { story: Story }) => {
      this.story = params.story;
    });
  }

  ngOnInit() {
    this.userService.readUser(this.story.owner, ['photoURL', 'displayName'])
      .flatMap((user: User) => {
        this.owner = user;
        // Cast journey stories (if a casting serving is active).
        return this.castService.active;
      })
      .subscribe((server: LiquidGalaxyServer) => {
        if (server) {
          this.cast();
        }
      });
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
    this.pending.first().subscribe((pending: Set<string>) => {
      pending.add(componentName);
      this.pending.next(pending);
    });
  }

  setUnpending(componentName: string) {
    this.pending.first().subscribe((pending: Set<string>) => {
      pending.delete(componentName);
      this.pending.next(pending);
    });
  }

  edit() {
    this.editState = EditState.Edit;
  }

  cancel() {
    this.editState = EditState.Cancel;
    const self = this;
    this.pending.subscribe(function (pending: Set<string>) {
      if (pending.size === 0) {
        this.unsubscribe();
        self.editState = EditState.View;
      }
    });
  }

  save() {
    this.editState = EditState.Save;
    const self = this;
    this.pending.subscribe(function (pending: Set<string>) {
      if (pending.size === 0) {
        this.unsubscribe();
        self.updateStory();
      }
    });
  }

  updateStory() {
    this.story.updatedAt = firebase.database.ServerValue.TIMESTAMP;
    this.storyService.updateStory(this.story).subscribe(() => {
      this.editState = EditState.View;
      this.snackBar.open('Saved!', null, { duration: 3000 });
    });
  }

  cast() {
    // We'll highlight the current story (but we will show others in the same journey as well).
    this.storyService.readStories(this.story.journey)
      .subscribe((stories: Story[]) => {
        const kml = this.kmlService.placemarks(stories, this.owner);
        const server: LiquidGalaxyServer = this.castService.active.value;
        server.writeKML(kml);
      });
  }
}
