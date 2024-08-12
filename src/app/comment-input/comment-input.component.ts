import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User, Comment } from '../types';

@Component({
  selector: 'app-comment-input',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './comment-input.component.html',
  styleUrl: './comment-input.component.css',
})
export class CommentInputComponent {
  @Input() users!: User[];
  @Output() commentAdded = new EventEmitter<Comment>();

  newComment = '';
  showUserList = false;
  filteredUsers: User[] = [];
  cursorPosition = 0;

  onInputChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    const value = target.value;
    const lastAtIndex = value.lastIndexOf('@');
    if (lastAtIndex !== -1) {
      const query = value.slice(lastAtIndex + 1);
      this.filteredUsers = this.users.filter(user =>
        user.name.toLowerCase().includes(query.toLowerCase())
      );
      this.showUserList = this.filteredUsers.length > 0;
    } else {
      this.showUserList = false;
    }
    this.cursorPosition = target.selectionStart;
    this.newComment = value;
  }

  selectUser(user: User) {
    const beforeAt = this.newComment.slice(0, this.newComment.lastIndexOf('@'));
    const afterAt = this.newComment.slice(this.cursorPosition);
    this.newComment = `${beforeAt}@${user.name} ${afterAt}`;
    this.showUserList = false;

    setTimeout(() => {
      const textarea = document.querySelector('textarea');
      if (textarea) {
        const newPosition = beforeAt.length + user.name.length + 2;
        textarea.setSelectionRange(newPosition, newPosition);
        textarea.focus();
      }
    });
  }

  addComment() {
    const commentText = this.newComment.trim();
    if (commentText) {
      const taggedUsers = this.extractTaggedUsers(commentText);
      this.commentAdded.emit({
        text: this.removeDuplicateMentions(commentText),
        taggedUsers,
      });
      this.newComment = '';
    }
  }

  private extractTaggedUsers(text: string): User[] {
    const taggedUsers: User[] = [];
    const uniqueUsernames = new Set<string>();

    this.users.forEach(user => {
      const regex = new RegExp(`@${user.name}\\b`, 'i');
      if (regex.test(text) && !uniqueUsernames.has(user.name.toLowerCase())) {
        taggedUsers.push(user);
        uniqueUsernames.add(user.name.toLowerCase());
      }
    });

    return taggedUsers;
  }

  private removeDuplicateMentions(text: string): string {
    const mentionedUsers: string[] = [];
    const words = text.split(/\s+/);

    return words
      .filter(word => {
        if (word.startsWith('@')) {
          const username = word.slice(1).toLowerCase();
          if (mentionedUsers.includes(username)) {
            return false;
          }
          mentionedUsers.push(username);
        }
        return true;
      })
      .join(' ');
  }

  onUserKeydown(event: KeyboardEvent, user: User) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.selectUser(user);
      event.preventDefault();
    }
  }
}
