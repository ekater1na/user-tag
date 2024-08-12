import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { User, Comment } from '../types';

@Component({
  selector: 'app-comments-list',
  standalone: true,
  imports: [NgFor, NgIf, JsonPipe],
  templateUrl: './comments-list.component.html',
  styleUrl: './comments-list.component.css',
})
export class CommentsListComponent {
  @Input() comments!: Comment[];
  @Input() users!: User[];

  formatCommentText(text: string): string {
    return text.replace(/@(\w+)/g, (match, username) => {
      const user = this.users.find(
        u => u.name.toLowerCase() === username.toLowerCase()
      );
      return user ? `<strong>@${username}</strong>` : match;
    });
  }
}
