import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CartService } from './cart.service';
import { AuthService } from './auth.service';
import { Observable, of, from, EMPTY, throwError } from 'rxjs';
import { catchError, concatMap, defaultIfEmpty, take } from 'rxjs/operators';

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
      totalPrice: items.reduce((s, x) => s + x.price * x.quantity, 0)
    };

    return from(this.postUrls).pipe(
      concatMap(url => this.http.post<Order>(url, payload).pipe(catchError(() => EMPTY))),
      take(1),
      defaultIfEmpty(null as any),
      concatMap(result => result ? of(result) : throwError(() => new Error('No POST endpoint found')))
    );
  }

  getUserOrders(username: string): Observable<Order[]> {
    const params = new HttpParams().set('username', username);
    return from(this.getUrls).pipe(
      concatMap(({ url, useQuery }) => {
        if (useQuery) {
          return this.http.get<Order[]>(url, { params }).pipe(catchError(() => EMPTY));
        }
        return this.http.get<Order[]>(`${url}/${encodeURIComponent(username)}`).pipe(catchError(() => EMPTY));
      }),
      take(1),
      defaultIfEmpty([] as Order[])
    );
  }
}



