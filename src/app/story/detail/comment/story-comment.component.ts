import { Component, OnInit, Input } from '@angular/core';

import {
  User,
  UserService,
  Story,
  Comment,
  CommentService,
} from '../../../shared';

@Component({
  selector: 'app-story-comment',
  templateUrl: 'story-comment.component.html',
  styleUrls: ['story-comment.component.scss'],
})
export class StoryCommentComponent implements OnInit {
  @Input() story: Story;

  comments: Comment[];
  users: { [id: string]: User } = {}; // Serves as a cache. So that repeated users aren't fetched
                                      // several times (if they have published more than a comment).

  constructor(
    private commentService: CommentService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.commentService.readComments(this.story.$key).subscribe((comments: Comment[]) => {
      // Comments are given from first to last. We are going to display them last to first.
      const commentsReversed = comments.reverse();
      this.comments = commentsReversed;

      // Gather user data associated with these comments.
      comments.forEach(comment => this.refreshUser(comment.owner));
    });
  }

  refreshUser(userId: string) {
    if (this.users[userId]) {
      return;
    }
    this.users[userId] = new User({}); // Async is going to take a while until it assigns the real values.
    this.userService.readUser(userId, ['displayName', 'photoURL']).first().subscribe((user: User) => {
      this.users[userId] = user;
    });
  }
}
