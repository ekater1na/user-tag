import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentInputComponent } from './comment-input.component';
import { FormsModule } from '@angular/forms';
import { User } from '../types';

describe('CommentInputComponent', () => {
  let component: CommentInputComponent;
  let fixture: ComponentFixture<CommentInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentInputComponent, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentInputComponent);
    component = fixture.componentInstance;
    component.users = [
      { userID: 1, name: 'Kevin' },
      { userID: 2, name: 'Jeff' },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter users when typing @', () => {
    const event = new InputEvent('input');
    Object.defineProperty(event, 'target', { value: { value: 'Hello @Ke' } });
    component.onInputChange(event);
    expect(component.filteredUsers.length).toBe(1);
    expect(component.filteredUsers[0].name).toBe('Kevin');
  });

  it('should select user and update newComment', () => {
    component.newComment = 'Hello @';
    component.cursorPosition = 7;
    const user: User = { userID: 1, name: 'Kevin' };
    component.selectUser(user);
    expect(component.newComment).toBe('Hello @Kevin ');
  });

  it('should add comment when addComment is called', () => {
    spyOn(component.commentAdded, 'emit');
    component.newComment = 'Test comment @Kevin';
    component.addComment();
    expect(component.commentAdded.emit).toHaveBeenCalledWith({
      text: 'Test comment @Kevin',
      taggedUsers: [{ userID: 1, name: 'Kevin' }],
    });
    expect(component.newComment).toBe('');
  });

  it('should not add empty comment', () => {
    spyOn(component.commentAdded, 'emit');
    component.newComment = '   ';
    component.addComment();
    expect(component.commentAdded.emit).not.toHaveBeenCalled();
  });
});
