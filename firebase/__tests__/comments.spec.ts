import * as targaryen from 'targaryen';

import * as rules from '../database.rules.json';

const AUTH_STORY_OWNER = {
  uid: '123',
};

const AUTH_COMMENT_OWNER = {
  uid: '234',
};

const AUTH_HACKER = {
  uid: '666',
};

describe('Comments', () => {
  it('should be able to post a new comment as a signed in user', () => {
    const data = {
      users: {
        '234': {
          email: 'lollipop@example.com',
        },
      },
      stories: {
        'abc': {
          title: '🍭',
        },
      }
    };
    const comment = {
      story: 'abc',
      owner: AUTH_COMMENT_OWNER.uid,
      updatedAt: { '.sv': 'timestamp' },
      description: '',
    };
    const db = targaryen.database(rules, data).as(AUTH_COMMENT_OWNER);
    const { allowed, info } = db.write('comments/xyz', comment);
    expect(allowed).toBe(true);
  });

  it('should be to delete comments as story or comment owner', () => {
    const data = {
      stories: {
        'abc': {
          owner: AUTH_STORY_OWNER.uid,
        }
      },
      comments: {
        'xyz': {
          story: 'abc',
          owner: AUTH_COMMENT_OWNER.uid,
        },
      },
    };
    const db = targaryen.database(rules, data);

    const asCommentOwner = db.as(AUTH_COMMENT_OWNER);
    const { allowed: allowedCommentOnwer } = asCommentOwner.write('comments/xyz', {});
    expect(allowedCommentOnwer).toBe(true);

    const asStoryOwner = db.as(AUTH_STORY_OWNER);
    const { allowed: allowedStoryOwner } = asStoryOwner.write('comments/xyz', {});
    expect(allowedStoryOwner).toBe(true);

    const asHacker = db.as(AUTH_HACKER);
    const { allowed: allowedHacker } = asHacker.write('comments/xyz', {});
    expect(allowedHacker).toBe(false);
  });

  it('when creating / editing comments story, owner, updatedAt and description and compulsory', () => {
    const data = {
      stories: {
        'abc': {
          owner: AUTH_STORY_OWNER.uid,
        },
      },
    };
    const dataWithComment = {
      stories: {
        'abc': {
          owner: AUTH_STORY_OWNER.uid,
        }
      },
      comments: {
        'xyz': {
          story: 'abc',
          owner: AUTH_COMMENT_OWNER.uid,
          updatedAt: 0,
          description: '',
        },
      },
    }
    const NEW_COMMENT = {
      story: 'abc',
      owner: AUTH_COMMENT_OWNER.uid,
      updatedAt: { '.sv': 'timestamp' },
      // Missing description field.
    };
    const NEW_DESCRIPTION = '🍭';

    const db = targaryen.database(rules, data).as(AUTH_COMMENT_OWNER);
    const { allowed } = db.write('comments/xyz', NEW_COMMENT);
    expect(allowed).toBe(false);

    const db2 = targaryen.database(rules, dataWithComment).as(AUTH_COMMENT_OWNER);
    const { allowed: allowed2, info } = db.write('comments/xyz/description', NEW_DESCRIPTION);
    expect(allowed).toBe(false);
  });

  it('should not be able to edit comments as story owner', () => {
    const data = {
      users: {
        '234': {
          email: 'lollipop@example.com',
        },
      },
      stories: {
        'abc': {
          owner: AUTH_STORY_OWNER.uid,
        }
      },
      comments: {
        'xyz': {
          story: 'abc',
          owner: AUTH_COMMENT_OWNER.uid,
          updatedAt: 0,
          description: '',
        },
      },
    };
    const NEW_COMMENT = {
      story: 'abc',
      owner: AUTH_COMMENT_OWNER.uid,
      updatedAt: { '.sv': 'timestamp' },
      description: '🍭',
    };

    const db = targaryen.database(rules, data);

    const asCommentOwner = db.as(AUTH_COMMENT_OWNER);
    const { allowed: allowedCommentOnwer } = asCommentOwner.write('comments/xyz', NEW_COMMENT);
    expect(allowedCommentOnwer).toBe(true);

    const asStoryOwner = db.as(AUTH_STORY_OWNER);
    const { allowed: allowedStoryOwner } = asStoryOwner.write('comments/xyz', NEW_COMMENT);
    expect(allowedStoryOwner).toBe(false);

    const asHacker = db.as(AUTH_HACKER);
    const { allowed: allowedHacker } = asHacker.write('comments/xyz', NEW_COMMENT);
    expect(allowedHacker).toBe(false);
  });
});
