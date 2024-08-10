import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentsComponent } from './comments.component';
import { CommentInputComponent } from '../comment-input/comment-input.component';
import { Comment } from '../types';

describe('CommentsComponent', () => {
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentsComponent, CommentsComponent, CommentInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new comment', () => {
    const newComment: Comment = {
      text: 'Test comment',
      taggedUsers: [],
    };
    component.addComment(newComment);
    expect(component.comments.length).toBe(1);
    expect(component.comments[0]).toEqual(newComment);
  });

  it('should alert when users are tagged', () => {
    spyOn(window, 'alert');
    const newComment: Comment = {
      text: 'Test comment with @Kevin',
      taggedUsers: [{ userID: 1, name: 'Kevin' }],
    };
    component.addComment(newComment);
    expect(window.alert).toHaveBeenCalledWith('User Kevin has been tagged!');
  });
});
