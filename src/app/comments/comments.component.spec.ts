import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentsComponent } from './comments.component';
import { CommentInputComponent } from '../comment-input/comment-input.component';
import { Comment } from '../types';
import { NotificationService } from '../notification/notification.service';
import { CommentsListComponent } from '../comments-list/comments-list.component';
import { NotificationComponent } from '../notification/notification.component';

describe('CommentsComponent', () => {
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;
  let notificationService: NotificationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommentsComponent,
        CommentsListComponent,
        CommentInputComponent,
        NotificationComponent,
      ],
      providers: [NotificationService],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentsComponent);
    component = fixture.componentInstance;
    notificationService = TestBed.inject(NotificationService);
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

  it('should notify when users are tagged', () => {
    spyOn(notificationService, 'show');
    const newComment: Comment = {
      text: 'Test comment with @Kevin',
      taggedUsers: [{ userID: 1, name: 'Kevin' }],
    };
    component.addComment(newComment);
    expect(notificationService.show).toHaveBeenCalledWith(
      'User Kevin has been tagged!',
      'info'
    );
  });
});
