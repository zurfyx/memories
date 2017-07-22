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

  it('should not be able to edit comments as story owner', () => {
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
          updatedAt: 0,
          description: '',
        },
      },
    };
    const NEW_DESCRIPTION = '🍭';

    const db = targaryen.database(rules, data);

    const asCommentOwner = db.as(AUTH_COMMENT_OWNER);
    const { allowed: allowedCommentOnwer } = asCommentOwner.write('comments/xyz/description', NEW_DESCRIPTION);
    expect(allowedCommentOnwer).toBe(true);

    const asStoryOwner = db.as(AUTH_STORY_OWNER);
    const { allowed: allowedStoryOwner } = asStoryOwner.write('comments/xyz/description', NEW_DESCRIPTION);
    expect(allowedStoryOwner).toBe(false);

    const asHacker = db.as(AUTH_HACKER);
    const { allowed: allowedHacker } = asHacker.write('comments/xyz/description', NEW_DESCRIPTION);
    expect(allowedHacker).toBe(false);
  });
});
