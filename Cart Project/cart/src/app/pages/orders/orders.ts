import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { OrderService } from '../../services/order.service';
import { NotificationService } from '../../services/notification.service';
import { Observable, of, switchMap, map, tap } from 'rxjs';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './orders.html',
  styleUrl: './orders.css'
})
export class OrdersPage {
  readonly auth = inject(AuthService);
  private readonly ordersSvc = inject(OrderService);
  private readonly notificationSvc = inject(NotificationService);
  private readonly router = inject(Router);

  userOrders$: Observable<DisplayOrder[]> = of(null).pipe(
    switchMap(() => {
      const user = this.auth.user();
      if (!user) return of([] as any[]);
      return this.ordersSvc.getUserOrders(user.username);
    }),
    map(list => list.map(mapToDisplayOrder))
  );

  gotoLogin() {
    this.router.navigateByUrl('/login');
  }

  approveOrder(orderId: string) {
    this.ordersSvc.updateOrderStatus(orderId, 'approved').subscribe({
      next: (order) => {
        if (order) {
          this.notificationSvc.addNotification(`Order #${orderId.slice(0, 8)} has been approved`);
          // Refresh orders list
          this.refreshOrders();
        }
      },
      error: (err) => {
        console.error('Approve order failed', err);
      }
    });
  }

  denyOrder(orderId: string) {
    this.ordersSvc.updateOrderStatus(orderId, 'denied').subscribe({
      next: (order) => {
        if (order) {
          this.notificationSvc.addNotification(`Order #${orderId.slice(0, 8)} has been denied`);
          // Refresh orders list
          this.refreshOrders();
        }
      },
      error: (err) => {
        console.error('Deny order failed', err);
      }
    });
  }

  private refreshOrders() {
    const user = this.auth.user();
    if (user) {
      this.userOrders$ = this.ordersSvc.getUserOrders(user.username).pipe(
        map(list => list.map(mapToDisplayOrder))
      );
    }
  }
}

type DisplayOrder = {
  id: string;
  createdAt: string;
  items: { name: string; quantity: number }[];
  totalQuantity?: number;
  totalPrice?: number;
  status?: 'pending' | 'approved' | 'denied';
  lastStatusChange?: string;
};

function mapToDisplayOrder(raw: any): DisplayOrder {
  const id: string = raw?.id ?? raw?._id ?? '';
  const createdAt: string = raw?.createdAt ?? raw?.date ?? new Date().toISOString();
  const itemsRaw: any[] = Array.isArray(raw?.items) ? raw.items : [];
  const items = itemsRaw.map((it: any) => ({
    name: it?.name ?? it?.productName ?? it?.product?.name ?? 'Item',
    quantity: Number(it?.quantity ?? it?.qty ?? 1)
  }));
  const totalQuantity = raw?.totalQuantity ?? items.reduce((s, x) => s + (Number(x.quantity) || 0), 0);
  // Backend uses 'total' field, fallback to 'totalPrice'
  const totalPrice = raw?.total ?? raw?.totalPrice;
  const status = raw?.status ?? 'pending';
  const lastStatusChange = raw?.lastStatusChange ?? raw?.updatedAt ?? createdAt;
  return { id, createdAt, items, totalQuantity, totalPrice, status, lastStatusChange };
}


