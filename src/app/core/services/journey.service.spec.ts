/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { JourneyService } from './journey.service';
import { StoryService } from './story.service';
import { FileService } from './file.service';
import { IdService } from './id.service';
import { Journey } from '../../shared';

class MockAngularFireDatabase {
  read = false;
  written = false;

  object(path) {
    this.read = true;
    return {
      set: (newVal) => {
        this.written = true;
        return Promise.resolve();
      },
    };
  }
}

class MockIdService {
  short() { return '🍭'; }
}

class MockImageService { }

describe('JourneyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        JourneyService,
        StoryService,
        { provide: AngularFireDatabase, useClass: MockAngularFireDatabase },
        { provide: IdService, useClass: MockIdService },
        { provide: FileService, useClass: MockImageService },
      ],
    });
  });

  it('creating a journey should not modify the original journey',
    inject([JourneyService, AngularFireDatabase],
           (service: JourneyService, angularFireDatabase: AngularFireDatabase) => {
      const journey = new Journey({ title: '🍬' });
      service.createJourney(journey).subscribe((newJourney: Journey) => {
        expect(newJourney).not.toBe(journey);
        expect(newJourney.$key).toBe('🍭');
        expect(newJourney.title).toBe('🍬');
      });
    })
  );
});
