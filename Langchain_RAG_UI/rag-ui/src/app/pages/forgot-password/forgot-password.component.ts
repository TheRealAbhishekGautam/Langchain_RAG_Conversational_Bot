import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthIllustrationComponent } from '../../components/auth-illustration/auth-illustration.component';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, AuthIllustrationComponent],
  template: `
  <div class="min-h-screen w-full flex flex-col lg:flex-row overflow-hidden login-bg relative contrast-scope -mt-20">
    <!-- Left Visual / Branding Panel -->
    <div class="relative flex-1 flex items-center justify-center px-8 py-12 isolate group overflow-hidden">
      <!-- Ambient gradient blobs (muted in light, vivid in dark) -->
      <div class="pointer-events-none absolute inset-0 mix-blend-normal">
        <div class="themed-blob blob-a"></div>
        <div class="themed-blob blob-b"></div>
      </div>
      <!-- Shared Illustration Component -->
      <app-auth-illustration></app-auth-illustration>
      <!-- Decorative vertical gradient divider on large screens -->
      <div class="hidden lg:block absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-white/60 dark:via-white/10 to-transparent opacity-60"></div>
    </div>

    <!-- Right Form Panel -->
    <div class="w-full lg:max-w-md xl:max-w-lg flex items-center justify-center px-6 sm:px-10 py-14 relative">
      <div class="absolute inset-0 pointer-events-none select-none form-bg-layer"></div>
      <div class="relative w-full max-w-sm sm:max-w-md form-shell">
        <div class="mb-8">
          <h1 class="text-2xl font-bold tracking-tight heading-gradient">Reset password</h1>
          <p class="text-sm mt-1 text-meta">Enter your email and we'll send you reset instructions</p>
        </div>
        <form class="space-y-4 group/form" (ngSubmit)="submit()" autocomplete="on" novalidate role="form" aria-describedby="forgot-help-block">
          <div class="space-y-2">
            <label for="email" class="field-label">Email</label>
            <div class="relative">
              <input id="email" class="input peer pr-10 input-surface" name="email" type="email" [(ngModel)]="email" required autocomplete="email" placeholder="you@example.com" aria-required="true" />
              <span class="pointer-events-none absolute inset-y-0 right-3 flex items-center icon-muted peer-focus:text-accent transition-colors duration-200">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2" ry="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              </span>
            </div>
          </div>
          <div class="flex items-center justify-end gap-4 p-1 py-0 text-xs">
            <div class="text-[11px] text-meta">v1.0</div>
          </div>
          <button class="btn btn-primary elevated-accent w-full justify-center relative overflow-hidden group/button text-sm font-semibold tracking-wide" [disabled]="loading()" aria-live="polite">
            <span class="absolute inset-0 accent-hover-gradient opacity-0 group-enabled:group-hover/button:opacity-100 transition-opacity duration-300"></span>
            <span class="flex items-center gap-2">
              <svg *ngIf="loading()" class="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" opacity="0.25"/><path d="M22 12a10 10 0 0 1-10 10" /></svg>
              {{ loading() ? 'Sending…' : 'Send reset link' }}
            </span>
          </button>
          <p class="text-[11px] text-error font-medium mt-1" *ngIf="error()" role="alert" id="forgot-error">{{ error() }}</p>
          <p class="text-[11px] text-emerald-500 font-medium mt-1" *ngIf="success()" role="alert" id="forgot-success">{{ success() }}</p>
        </form>
        <p id="forgot-help-block" class="mt-8 text-xs text-meta text-center">Remember your password? <a routerLink="/login" class="link-accent font-medium">Sign in</a></p>
        <div class="mt-10 flex items-center justify-center">
          <div class="h-px w-16 bg-gradient-to-r from-transparent via-slate-300/60 dark:via-slate-600/50 to-transparent"></div>
          <span class="mx-3 text-[10px] tracking-[0.2em] font-semibold uppercase text-meta-muted">Secure</span>
          <div class="h-px w-16 bg-gradient-to-r from-transparent via-slate-300/60 dark:via-slate-600/50 to-transparent"></div>
        </div>
      </div>
    </div>
  </div>
  `,
  styleUrls: ['../auth-shared.scss'],
})
export class ForgotPasswordComponent {
  email = '';
  loading = signal(false);
  success = signal<string | null>(null);
  error = signal<string | null>(null);

  constructor(private auth: AuthService) {}

  submit() {
    if (!this.email) {
      this.error.set('Please enter your email address');
      return;
    }
    
    if (!this.email.includes('@') || !this.email.includes('.')) {
      this.error.set('Please enter a valid email address');
      return;
    }
    
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
        this.error.set(e.error?.detail || e.error?.message || 'Failed to send reset email');
        this.loading.set(false);
      }
    });
  }
}
