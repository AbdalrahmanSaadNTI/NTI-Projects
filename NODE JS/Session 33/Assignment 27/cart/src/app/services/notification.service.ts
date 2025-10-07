import { Injectable, signal } from '@angular/core';

export interface Notification {
  message: string;
  timestamp: string;
  read: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private _notifications = signal<Notification[]>([]);
  notifications = this._notifications.asReadonly();
  
  private _unreadCount = signal<number>(0);
  unreadCount = this._unreadCount.asReadonly();

  constructor() {}

  addNotification(message: string): void {
    const newNotification: Notification = {
      message,
      timestamp: new Date().toISOString(),
      read: false
    };
    
    this._notifications.update(notifications => [newNotification, ...notifications]);
    this._unreadCount.update(count => count + 1);
  }

  markAllAsRead(): void {
    this._notifications.update(notifications => 
      notifications.map(notification => ({ ...notification, read: true }))
    );
    this._unreadCount.set(0);
  }

  clearNotifications(): void {
    this._notifications.set([]);
    this._unreadCount.set(0);
  }
}