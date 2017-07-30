import * as targaryen from 'targaryen';

import * as rules from '../database.rules.json';

const AUTH_USER = {
  uid: '123',
  token: {
    email: 'lollipop@example.com',
  },
};

const AUTH_HACKER = {
  uid: '666',
  token: {
    email: 'lollipop@example.com',
  },
};

describe('Users private', () => {
  it('should not allow me to read if I\'m not the owner', () => {
    const data = {
      usersPrivate: {
        '123': {
          email: 'lollipop@example.com',
        }
      }
    };
    const db = targaryen.database(rules, data)

    const asUser = db.as(AUTH_USER);
    const { allowed: allowedUser } = asUser.read('usersPrivate/123');
    expect(allowedUser).toBe(true);

    const asHacker = db.as(AUTH_HACKER);
    const { allowed: allowedHacker } = asHacker.read('usersPrivate/123');
    expect(allowedHacker).toBe(false);
  });

  it('should not allow me to write if I\'m not the owner', () => {
    const data = {};
    const newUserPrivate = {
      email: AUTH_USER.token.email,
    };
    const newHackerPrivate = {
      email: AUTH_HACKER.token.email,
    }
    const db = targaryen.database(rules, data);

    const asUser = db.as(AUTH_USER);
    const { allowed: allowedUser } = asUser.write('usersPrivate/123', newUserPrivate);
    expect(allowedUser).toBe(true);

    const asHacker = db.as(AUTH_HACKER);
    const { allowed: allowedHacker } = asHacker.write('usersPrivate/123', newHackerPrivate);
    expect(allowedHacker).toBe(false);
  });

  it('should not allow me to write if I\'m not signed in', () => {
    const data = {};
    const newUserPrivate = {
      email: null,
    };

    const db = targaryen.database(rules, data);
    const { allowed } = db.write('usersPrivate/null', newUserPrivate);
    expect(allowed).toBe(false);
  });

  it('should not allow me to delete the entry', () => {
    const data = {
      usersPrivate: {
        '123': {
          email: 'lollipop@example.com',
        }
      }
    };
    const db = targaryen.database(rules, data).as(AUTH_USER);
    const { allowed } = db.write('usersPrivate/123', null);
    expect(allowed).toBe(false);
  });
});
