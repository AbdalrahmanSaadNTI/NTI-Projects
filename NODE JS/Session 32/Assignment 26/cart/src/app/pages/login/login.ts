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

  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  submit() {
    const u = this.username.trim();
    const p = this.password;
    if (!u || !p) return;
    this.auth.login(u, p);
    this.router.navigateByUrl('/');
  }
}


