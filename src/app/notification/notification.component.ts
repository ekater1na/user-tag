import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService } from './notification.service';
import { Notification } from '../types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent implements OnInit, OnDestroy {
  notification: Notification | null = null;
  private subscription: Subscription | undefined;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.subscription = this.notificationService.notifications$.subscribe(
      notification => {
        this.notification = notification;
        setTimeout(() => (this.notification = null), 1500); // Hide after 1.5 seconds
      }
    );
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
