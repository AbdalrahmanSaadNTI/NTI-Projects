import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { OrderService } from '../../services/order.service';
import { Observable, of, switchMap, map } from 'rxjs';

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
}

type DisplayOrder = {
  id: string;
  createdAt: string;
  items: { name: string; quantity: number }[];
  totalQuantity?: number;
  totalPrice?: number;
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
  const totalPrice = raw?.total ?? raw?.totalPrice;
  return { id, createdAt, items, totalQuantity, totalPrice };
}


