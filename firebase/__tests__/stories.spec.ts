import * as targaryen from 'targaryen';

import * as rules from '../database.rules.json';

const AUTH_USER = {
  uid: '123',
};

const AUTH_HACKER = {
  uid: '666',
};

describe('Stories', () => {
  it('should be able to create as a signed in user', () => {
    const data = {
      users: {
        '123': {
          displayName: '.'
        }
      },
      journeys: {
        'abc': {
          owner: '123',
        }
      }
    };
    const NEW_STORY = {
      journey: 'abc',
      owner: '123',
      updatedAt: { '.sv': 'timestamp' },
      title: '🍭',
    }
    const db = targaryen.database(rules, data).as(AUTH_USER);
    const { allowed } = db.write('stories/xyz', NEW_STORY);
    expect(allowed).toBe(true);
  });

  it('should be able to edit as the owner', () => {
    const data = {
      users: {
        '123': {
          displayName: '.'
        }
      },
      journeys: {
        'abc': {
          owner: '123',
        }
      },
      stories: {
        'xyz': {
          journey: 'abc',
          owner: '123',
          updatedAt: 0,
          title: '🍭'
        }
      }
    };
    const db = targaryen.database(rules, data);

    const asUser = db.as(AUTH_USER);
    const { allowed: allowedUser } = asUser.write('stories/xyz/title', '🍬');
    expect(allowedUser).toBe(true);

    const asHacker = db.as(AUTH_HACKER);
    const { allowed: allowedHacker } = asHacker.write('stories/xyz/title', 'HACKED');
    expect(allowedHacker).toBe(false);
  });

  it ('should be able to delete as the owner', () => {
    const data = {
      users: {
        '123': {
          displayName: '.'
        }
      },
      journeys: {
        'abc': {
          owner: '123',
        }
      },
      stories: {
        'xyz': {
          journey: 'abc',
          owner: '123',
          updatedAt: 0,
          title: '🍭'
        }
      }
    };
    const db = targaryen.database(rules, data);

    const asUser = db.as(AUTH_USER);
    const { allowed: allowedUser } = asUser.write('stories/xyz', null);
    expect(allowedUser).toBe(true);

    const asHacker = db.as(AUTH_HACKER);
    const { allowed: allowedHacker } = asHacker.write('stories/xyz', null);
    expect(allowedHacker).toBe(false);
  });
});
