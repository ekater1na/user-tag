import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Notification } from '../types';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSubject = new Subject<Notification>();
  notifications$ = this.notificationSubject.asObservable();

  show(
    message: string,
    type: 'info' | 'success' | 'warning' | 'error' = 'info'
  ) {
    this.notificationSubject.next({ message, type });
  }
}
