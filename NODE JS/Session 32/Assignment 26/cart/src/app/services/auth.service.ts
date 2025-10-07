import { Injectable, signal, effect } from '@angular/core';

export interface AuthUser {
  id: string;
  username: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly STORAGE_KEY = 'auth_user';

  private loadUser(): AuthUser | null {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  }

  private _user = signal<AuthUser | null>(this.loadUser());
  user = this._user.asReadonly();

  constructor() {
    effect(() => {
      const current = this._user();
      if (current) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(current));
      } else {
        localStorage.removeItem(this.STORAGE_KEY);
      }
    });
  }

  isAuthenticated(): boolean {
    return !!this._user();
  }

  login(username: string, password: string) {
    // Demo-only: accept any non-empty username/password. Replace with real API call if needed.
    if (!username || !password) return;
    const user: AuthUser = {
      id: crypto.randomUUID(),
      username
    };
    this._user.set(user);
  }

  logout() {
    this._user.set(null);
  }
}



