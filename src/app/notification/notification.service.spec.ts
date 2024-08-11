import { TestBed } from '@angular/core/testing';
import { NotificationService } from './notification.service';
import { Notification } from '../types';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationService],
    });
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit a notification when show is called', done => {
    const testNotification: Notification = {
      type: 'info',
      message: 'Test message',
    };

    service.notifications$.subscribe(notification => {
      expect(notification).toEqual(testNotification);
      done();
    });

    service.show(testNotification.message, testNotification.type);
  });
});
