import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  constructor(
    public cart: CartService, 
    public auth: AuthService,
    public notificationSvc: NotificationService
  ) {}

  private readonly router = inject(Router);

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/');
  }
  
  markNotificationsAsRead() {
    this.notificationSvc.markAllAsRead();
  }
}
