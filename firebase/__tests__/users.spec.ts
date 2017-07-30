import * as targaryen from 'targaryen';

import * as rules from '../database.rules.json';

const AUTH_USER = {
  uid: '123',
  token: {
    name: '🍭',
  },
};

const AUTH_HACKER = {
  uid: '666',
  token: {
    name: '🍭',
  },
};

describe('User', () => {
  it('should not allow me to write if I\'m not the owner', () => {
    const data = {};
    const newUser = {
      displayName: AUTH_USER.token.name,
      photoURL: 'https://lh5.googleusercontent.com/-h4p4Wj9re1k/AAAAAAAAAAI/AAAAAAAAH34/xxxxxxxxx/photo.jpg',
      updatedAt: { '.sv': 'timestamp' },
    }
    const newHacker = {
      displayName: AUTH_HACKER.token.name,
      photoURL: 'https://lh5.googleusercontent.com/-h4p4Wj9re1k/AAAAAAAAAAI/AAAAAAAAH34/xxxxxxxxx/photo.jpg',
      updatedAt: { '.sv': 'timestamp' },
    }
    const db = targaryen.database(rules, data)

    const asUser = db.as(AUTH_USER);
    const { allowed: allowedUser } = asUser.write('users/123', newUser);
    expect(allowedUser).toBe(true);

    const asHacker = db.as(AUTH_HACKER);
    const { allowed: allowedHacker } = asHacker.write('users/123', newHacker);
    expect(allowedHacker).toBe(false);
  });

  it('should not allow me write if I\'m not signed in', () => {
    const data = {};
    const newUser = {
      displayName: null,
      updatedAt: { '.sv': 'timestamp' },
    };

    const db = targaryen.database(rules, data);
    const { allowed } = db.write('users/null', newUser);
    expect(allowed).toBe(false);
  });

  it('should be able to read a list of users', () => {
    const data = {
      '123': {
        displayName: '🍭',
      }
    };
    const db = targaryen.database(rules, data);
    const { allowed } = db.read('users');
    expect(allowed).toBe(true);
  });

  it('should not be possible to delete the user entry', () => {
    const data = {
      users: {
        '123': {
          displayName: '🍭',
        },
      },
    };
    const db = targaryen.database(rules, data).as(AUTH_USER);
    const { allowed } = db.write('users/123', null);
    expect(allowed).toBe(false);
  });
});
