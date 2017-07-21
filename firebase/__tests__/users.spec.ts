import * as targaryen from 'targaryen';

import * as rules from '../database.rules.json';

const AUTH_USER = {
  uid: '123',
  token: {
    name: '🍭',
    email: 'lollipop@example.com',
  },
};

const AUTH_HACKER = {
  uid: '666',
  token: {
    name: '🍭',
    email: 'lollipop@example.com',
  },
};

describe('User', () => {
  it('should allow me to write if I\'m the owner', () => {
    const data = {};
    const db = targaryen.database(rules, data).as(AUTH_USER);
    const { allowed } = db.write('users/123', {
      displayName: '🍭',
      email: 'lollipop@example.com',
    });
    expect(allowed).toBe(true);
  });

  it('should not allow to read a random user the email', () => {
    const data = {
      users: {
        '123': {
          displayName: '🍭',
          email: 'lollipop@example.com',
        },
      },
    };
    const db = targaryen.database(rules, data);
    const dbAsUser = db.as(AUTH_USER);
    const dbAsHacker = db.as(AUTH_HACKER);

    const { allowed: allowedUser, info } = dbAsUser.read('users/123/email');
    expect(allowedUser).toBe(true);

    const { allowed: allowedHacker } = dbAsHacker.read('user/123/email');
    expect(allowedHacker).toBe(false);
  });

  it('should not be possible to delete the user entry', () => {
    const data = {
      users: {
        '123': {
          displayName: '🍭',
          email: 'lollipop@example.com',
        },
      },
    };
    const db = targaryen.database(rules, data).as(AUTH_USER);
    const { allowed } = db.write('users/123', {});
    expect(allowed).toBe(false);
  });
});
