import * as targaryen from 'targaryen';

import * as rules from '../database.rules.json';

const AUTH_USER = {
  uid: '123',
};

const AUTH_HACKER = {
  uid: '666',
};

describe('Journeys', () => {
  it('should be able to create as a signed in user', () => {
    const data = {
      users: {
        '123': {
          displayName: '.',
        }
      }
    };
    const NEW_JOURNEY = {
      owner: '123',
      title: '🍭',
      updatedAt: { '.sv': 'timestamp' },
    };
    const db = targaryen.database(rules, data).as(AUTH_USER);
    const { allowed } = db.write('journeys/abc', NEW_JOURNEY);
    expect(allowed).toBe(true);
  });

  it('should be able to edit as the owner', () => {
    const data = {
      users: {
        '123':  {
          displayName: '.',
        }
      },
      journeys: {
        'abc': {
          owner: '123',
          title: '🍭',
          updatedAt: 0,
        }
      }
    };
    const db = targaryen.database(rules, data);

    const asUser = db.as(AUTH_USER);
    const { allowed: allowedUser } = asUser.write('journeys/abc/title', '🍬');
    expect(allowedUser).toBe(true);

    const asHacker = db.as(AUTH_HACKER);
    const { allowed: allowedHacker } = asHacker.write('journeys/abc/title', 'HACKED');
    expect(allowedHacker).toBe(false);
  });

  it('should be able to delete as the owner', () => {
    const data = {
      users: {
        '123':  {
          displayName: '.',
        }
      },
      journeys: {
        'abc': {
          owner: '123',
          title: '🍭',
          updatedAt: 0,
        }
      }
    };
    const db = targaryen.database(rules, data);

    const asUser = db.as(AUTH_USER);
    const { allowed: allowedUser } = asUser.write('journeys/abc', null);
    expect(allowedUser).toBe(true);

    const asHacker = db.as(AUTH_HACKER);
    const { allowed: allowedHacker } = asHacker.write('journeys/abc', null);
    expect(allowedHacker).toBe(false);
  });
});
