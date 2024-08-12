import { Component } from '@angular/core';
import { CommentInputComponent } from '../comment-input/comment-input.component';
import { CommentsListComponent } from '../comments-list/comments-list.component';
import { User, Comment } from '../types';
import { NotificationComponent } from '../notification/notification.component';
import { NotificationService } from '../notification/notification.service';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [
    CommentInputComponent,
    CommentsListComponent,
    NotificationComponent,
  ],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent {
  users: User[] = [
    { userID: 1, name: 'Kevin' },
    { userID: 2, name: 'Jeff' },
    { userID: 3, name: 'Bryan' },
    { userID: 4, name: 'Gabbey' },
  ];

  comments: Comment[] = [];

  constructor(private notificationService: NotificationService) {}

  addComment(newComment: Comment) {
    this.comments.push(newComment);
    this.notifyTaggedUsers(newComment.taggedUsers);
  }

  private notifyTaggedUsers(users: User[]) {
    users.forEach(user => {
      this.notificationService.show(
        `User ${user.name} has been tagged!`,
        'info'
      );
    });
  }
}
