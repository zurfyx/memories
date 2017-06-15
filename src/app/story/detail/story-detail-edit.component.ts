import {
  OnChanges,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { Story } from '../../shared';
import { EditState } from './edit-state';

export abstract class StoryDetailEditComponent implements OnChanges {
  abstract ID: string; // Unique component identifier amongst the story edit components.

  @Input() story: Story;
  @Input() editState;
  @Output() pending = new EventEmitter<void>();
  @Output() unpending = new EventEmitter<void>();

  constructor() { }

  /**
   * Monitors and executes actions on edit state changes.
   * On EditSave.Save story will be updated and cleanup will be called next.
   * On EditSave.Cancel cleanup will be cancel.
   * @param changes @Input changes.
   */
  ngOnChanges(changes: SimpleChanges) {
    const editState = changes['editState'] && changes['editState'].currentValue;
    if (editState === EditState.Save) {
      this.updateStory().subscribe(() => this.cleanup());
    } else if (editState === EditState.Cancel) {
      this.cleanup();
    }
  }

  /**
   * Marks the component as having pending changes to commit onto the initial Story.
   * Parent will wait for the component to finish saving changes before publishing the latest
   * changes onto the database.
   * See ngOnChanges()
   */
  setPending() {
    this.pending.emit();
  }

  /**
   * Unmarks the component as having pending changes to commit onto the initial Story.
   * Parent will be allowed to finish the edition and publish the latest changes at anytime.
   */
  unsetPending() {
    this.unpending.emit();
  }

  /**
   * Returns true if currently editing, that is either one the following states:
   * EditState.Edit, EditState.Cancel, EditState.Save.
   */
  isEditing(): boolean {
    return this.editState === EditState.Edit
        || this.editState === EditState.Cancel
        || this.editState === EditState.Save;
  }

  /**
   * Cleanups edition data.
   */
  abstract cleanup(): void;

  /**
   * Update the original story with the new data, that might be later published into the db.
   */
  abstract updateStory(): Observable<void>;
}
