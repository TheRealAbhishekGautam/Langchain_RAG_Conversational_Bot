import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="min-h-screen grid place-items-center gradient-animated px-4">
    <div class="w-full max-w-md">
      <div class="card p-6">
        <h1 class="text-xl font-semibold text-theme">Create your account</h1>
        <p class="text-sm text-theme-muted">Start chatting with your documents</p>
        <form class="mt-6 space-y-4" (ngSubmit)="submit()">
          <div>
            <label class="text-xs text-theme-secondary">Username</label>
            <input class="input mt-1" name="username" [(ngModel)]="username" required minlength="3" />
          </div>
          <div>
            <label class="text-xs text-theme-secondary">Email</label>
            <input class="input mt-1" name="email" [(ngModel)]="email" required type="email" />
          </div>
          <div>
            <label class="text-xs text-theme-secondary">Password</label>
            <input class="input mt-1" type="password" name="password" [(ngModel)]="password" required minlength="8" />
          </div>
          <button class="btn btn-primary w-full justify-center" [disabled]="loading()">{{ loading() ? 'Creating...' : 'Create account' }}</button>
          <p class="text-xs text-danger" *ngIf="error()">{{ error() }}</p>
          <p class="text-xs text-success" *ngIf="success()">{{ success() }}</p>
        </form>
        <p class="text-xs text-theme-muted mt-4">Already have an account? <a routerLink="/login" class="text-accent hover:underline">Sign in</a>.</p>
      </div>
    </div>
  </div>
  `
})
export class RegisterPageComponent {
  username = '';
  email = '';
  password = '';
  loading = signal(false);
  error = signal<string | null>(null);
  success = signal<string | null>(null);

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    if (!this.username || !this.email || !this.password) return;
    this.loading.set(true);
    this.error.set(null);
    this.success.set(null);
    this.auth.register({ username: this.username, email: this.email, password: this.password }).subscribe({
      next: (res) => {
        if (res.success) {
          this.success.set('Registration successful. You can now sign in.');
          setTimeout(() => this.router.navigate(['/login']), 800);
        } else {
          this.error.set(res.message || 'Registration failed');
        }
        this.loading.set(false);
      },
      error: (e) => { this.error.set(e.error?.detail || 'Registration failed'); this.loading.set(false); }
    });
  }
}
