import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {

  constructor(protected cart:CartService) {}

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

}
