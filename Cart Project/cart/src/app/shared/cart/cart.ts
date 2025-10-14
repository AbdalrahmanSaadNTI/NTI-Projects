import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {

  constructor(protected cart:CartService, private auth: AuthService, private orders: OrderService) {}

  private readonly router = inject(Router);

  remove(id: string) {
    this.cart.removeItem(id);
  }

  increment(item: { id: string; quantity: number }) {
    this.cart.updateQuantity(item.id, item.quantity + 1);
  }

  decrement(item: { id: string; quantity: number }) {
    const nextQty = Math.max(1, item.quantity - 1);
    this.cart.updateQuantity(item.id, nextQty);
  }

  saveOrder() {
    if (!this.auth.isAuthenticated()) {
      this.router.navigateByUrl('/login');
      return;
    }
    this.orders.saveCurrentCartAsOrder().subscribe({
      next: (order) => {
        if (order) {
          this.router.navigateByUrl('/orders');
        }
      },
      error: (err) => {
        console.error('Save order failed', err);
        alert('Failed to save order. Please try again.');
      }
    });
  }
}
