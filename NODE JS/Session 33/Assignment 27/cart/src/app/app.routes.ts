import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Cart } from './shared/cart/cart';
import { LoginPage } from './pages/login/login';
import { OrdersPage } from './pages/orders/orders';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'cart', component: Cart },
  { path: 'login', component: LoginPage },
  { path: 'orders', component: OrdersPage },
  { path: '**', redirectTo: '' }
];
