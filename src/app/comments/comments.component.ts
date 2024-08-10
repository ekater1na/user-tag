import { Component } from '@angular/core';
import { CommentInputComponent } from '../comment-input/comment-input.component';
import { CommentsListComponent } from '../comments-list/comments-list.component';
import { User, Comment } from '../types';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommentInputComponent, CommentsListComponent],
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

  addComment(newComment: Comment) {
    this.comments.push(newComment);
    this.alertTaggedUsers(newComment.taggedUsers);
  }

  private alertTaggedUsers(users: User[]) {
    users.forEach(user => {
      alert(`User ${user.name} has been tagged!`);
    });
  }
}
