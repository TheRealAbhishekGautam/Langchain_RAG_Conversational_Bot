import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="min-h-screen grid place-items-center px-4">
    <div class="w-full max-w-md">
      <div class="card p-6">
        <h1 class="text-xl font-semibold">Forgot password</h1>
        <p class="text-sm opacity-80">Enter your email and we'll send you reset instructions.</p>
        <form class="mt-6 space-y-4" (ngSubmit)="submit()">
          <div>
            <label class="text-xs opacity-80">Email</label>
            <input class="input mt-1" name="email" [(ngModel)]="email" required type="email" />
          </div>
          <button class="btn btn-primary w-full justify-center" [disabled]="loading()">{{ loading() ? 'Sending...' : 'Send reset link' }}</button>
          <p class="text-xs text-emerald-400" *ngIf="success()">{{ success() }}</p>
          <p class="text-xs text-red-400" *ngIf="error()">{{ error() }}</p>
        </form>
      </div>
    </div>
  </div>
  `
})
export class ForgotPasswordComponent {
  email = '';
  loading = signal(false);
  success = signal<string | null>(null);
  error = signal<string | null>(null);

  constructor(private auth: AuthService) {}

  submit() {
    if (!this.email) return;
    this.loading.set(true);
    this.success.set(null);
    this.error.set(null);
    
    this.auth.forgotPassword({ email: this.email }).subscribe({
      next: (res) => {
        if (res.success) {
          this.success.set(res.message);
        } else {
          this.error.set(res.message);
        }
        this.loading.set(false);
      },
      error: (e) => {
        this.error.set(e.error?.detail || 'Failed to send reset email');
        this.loading.set(false);
      }
    });
  }
}
