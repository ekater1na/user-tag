import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsListComponent } from './comments-list.component';

describe('CommentsListComponent', () => {
  let component: CommentsListComponent;
  let fixture: ComponentFixture<CommentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentsListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentsListComponent);
    component = fixture.componentInstance;
    component.comments = [];
    component.users = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should format comment text with tagged users', () => {
    component.users = [{ userID: 1, name: 'Kevin' }];
    const formattedText = component.formatCommentText('Hello @Kevin!');
    expect(formattedText).toBe('Hello <strong>@Kevin</strong>!');
  });

  it('should not format text without valid tagged users', () => {
    component.users = [{ userID: 1, name: 'Kevin' }];
    const formattedText = component.formatCommentText('Hello @John!');
    expect(formattedText).toBe('Hello @John!');
  });
});
