import { Injectable, signal, effect } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; // <-- Import HttpClient

export interface AuthUser {
  id: string;
  username: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  setUser(arg0: { id: any; username: any; }) {
    throw new Error('Method not implemented.');
  }

  private readonly STORAGE_KEY = 'auth_user';

  private loadUser(): AuthUser | null {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  }

  private _user = signal<AuthUser | null>(this.loadUser());
  user = this._user.asReadonly();

  constructor(private http: HttpClient) { // <-- Inject HttpClient
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

  login(username: string, password: string): Observable<any> {
    return this.http.post('/api/login', { username, password });
  }

  logout() {
    this._user.set(null);
  }
}