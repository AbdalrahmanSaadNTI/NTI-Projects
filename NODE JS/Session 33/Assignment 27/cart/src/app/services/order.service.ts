import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CartService } from './cart.service';
import { AuthService } from './auth.service';
import { Observable, of, from, EMPTY, throwError } from 'rxjs';
import { catchError, concatMap, defaultIfEmpty, take, delay } from 'rxjs/operators';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  username: string;
  createdAt: string;
  items: OrderItem[];
  totalQuantity: number;
  totalPrice: number;
  status?: 'pending' | 'approved' | 'denied';
  lastStatusChange?: string;
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly cart = inject(CartService);
  private readonly auth = inject(AuthService);
  private readonly http = inject(HttpClient);
  private readonly postUrls = ['/api/v1.0/orders', '/api/v1.0/order'];
  private readonly getUrls = [
    { url: '/api/v1.0/orders', useQuery: true },
    { url: '/api/v1.0/order', useQuery: true },
    { url: '/api/v1.0/orders', useQuery: false },
    { url: '/api/v1.0/order', useQuery: false }
  ] as const;

  saveCurrentCartAsOrder(): Observable<Order | null> {
    const user = this.auth.user();
    if (!user) return of(null);

    const items = this.cart.items().map(i => ({
      id: i.id,
      name: i.name,
      price: i.price,
      quantity: i.quantity
    }));

    const payload = {
      username: user.username,
      items,
      totalQuantity: items.reduce((s, x) => s + x.quantity, 0),
      totalPrice: items.reduce((s, x) => s + x.price * x.quantity, 0),
      status: 'pending',
      lastStatusChange: new Date().toISOString()
    };

    return from(this.postUrls).pipe(
      concatMap(url => this.http.post<Order>(url, payload).pipe(catchError(() => EMPTY))),
      take(1),
      defaultIfEmpty(null as any),
      concatMap(result => result ? of(result) : throwError(() => new Error('No POST endpoint found')))
    );
  }

  updateOrderStatus(orderId: string, status: 'approved' | 'denied'): Observable<Order | null> {
    const payload = {
      status,
      lastStatusChange: new Date().toISOString()
    };

    // Call backend API to update order status (backend uses PUT)
    return this.http.put<Order>(`/api/v1.0/orders/${orderId}`, payload).pipe(
      catchError((err) => {
        console.error('Update order failed:', err);
        return of(null);
      })
    );
  }

  // Mock orders storage for development/testing
  private mockOrders: Order[] = [
    {
      id: '1234567890',
      username: '',
      createdAt: new Date().toISOString(),
      items: [
        { id: '1', name: 'Product 1', price: 10, quantity: 2 },
        { id: '2', name: 'Product 2', price: 15, quantity: 1 }
      ],
      totalQuantity: 3,
      totalPrice: 35,
      status: 'pending',
      lastStatusChange: new Date().toISOString()
    },
    {
      id: '0987654321',
      username: '',
      createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      items: [
        { id: '3', name: 'Product 3', price: 20, quantity: 3 }
      ],
      totalQuantity: 3,
      totalPrice: 60,
      status: 'pending',
      lastStatusChange: new Date(Date.now() - 86400000).toISOString()
    }
  ];

  getUserOrders(username: string): Observable<Order[]> {
    // Backend doesn't filter by username, returns all orders
    return this.http.get<Order[]>('/api/v1.0/orders').pipe(
      catchError((err) => {
        console.error('Get orders failed:', err);
        return of([]);
      })
    );
  }
}



