import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="min-h-screen grid place-items-center gradient-animated px-4">
    <div class="w-full max-w-md">
      <div class="card p-6">
        <h1 class="text-xl font-semibold text-theme">Welcome back</h1>
        <p class="text-sm text-theme-muted">Sign in to continue</p>
        <form class="mt-6 space-y-4" (ngSubmit)="submit()">
          <div>
            <label class="text-xs text-theme-secondary">Username</label>
            <input class="input mt-1" name="username" [(ngModel)]="username" required />
          </div>
          <div>
            <label class="text-xs text-theme-secondary">Password</label>
            <input class="input mt-1" type="password" name="password" [(ngModel)]="password" required />
          </div>
          <div class="flex items-center justify-between text-xs">
            <label class="inline-flex items-center gap-2 text-theme-secondary">
              <input type="checkbox" [(ngModel)]="remember" name="remember" class="focus-ring" />
              <span>Remember me</span>
            </label>
            <a routerLink="/forgot-password" class="text-accent hover:underline">Forgot password?</a>
          </div>
          <button class="btn btn-primary w-full justify-center" [disabled]="loading()">{{ loading() ? 'Signing in...' : 'Sign in' }}</button>
          <p class="text-xs text-danger" *ngIf="error()">{{ error() }}</p>
        </form>
        <p class="text-xs text-theme-muted mt-4">Don't have an account? <a routerLink="/register" class="text-accent hover:underline">Create one</a>.</p>
      </div>
    </div>
  </div>
  `
})
export class LoginPageComponent {
  username = '';
  password = '';
  remember = true;
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    if (!this.username || !this.password) return;
    this.loading.set(true);
    this.error.set(null);
  this.auth.login({ username: this.username, password: this.password }, this.remember).subscribe({
      next: (res) => {
        if (res.success) this.router.navigate(['/conversation']);
        else this.error.set(res.message || 'Login failed');
        this.loading.set(false);
      },
      error: (e) => { this.error.set(e.error?.detail || 'Login failed'); this.loading.set(false); }
    });
  }
}
