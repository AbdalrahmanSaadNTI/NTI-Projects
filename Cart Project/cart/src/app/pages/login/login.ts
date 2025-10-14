import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginPage {
  username = '';
  password = '';
  errorMessage = '';

  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  submit() {
    this.errorMessage = '';
    const u = this.username.trim();
    const p = this.password;
    if (!u || !p) return;

    // Use real backend authentication
    this.auth.login(u, p).subscribe({
      next: (response) => {
        if (response?.login === 'done') {
          // Backend returns token, role, fullName. It doesn't include username/id.
          // Persist minimal user info for the app.
          this.auth.setUser({ id: 'user-id', username: u });
          this.router.navigateByUrl('/');
        } else {
          this.errorMessage = 'Invalid username or password.';
        }
      },
      error: (err) => {
        console.error('Login error:', err);
        this.errorMessage = 'Login failed. Please check your credentials.';
      }
    });
  }
}


