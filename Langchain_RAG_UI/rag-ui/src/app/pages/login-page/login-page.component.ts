import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthIllustrationComponent } from '../../components/auth-illustration/auth-illustration.component';

// New lightweight animated SVG crafted specifically for the login page (different from hero component)
// Focus: subtle, professional, AI + document ingestion vibe without being too busy.

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule, AuthIllustrationComponent, RouterModule],
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
          <h1 class="text-2xl font-bold tracking-tight heading-gradient">Welcome back</h1>
          <p class="text-sm mt-1 text-meta">Sign in to your account</p>
        </div>
  <form class="space-y-4 group/form" (ngSubmit)="submit()" autocomplete="on" novalidate role="form" aria-describedby="login-help-block">
          <div class="space-y-2">
            <label for="username" class="field-label">Username</label>
            <div class="relative">
              <input id="username" class="input peer pr-10 input-surface" name="username" [(ngModel)]="username" required autocomplete="username" placeholder="john.doe" aria-required="true" />
              <span class="pointer-events-none absolute inset-y-0 right-3 flex items-center icon-muted peer-focus:text-accent transition-colors duration-200">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2" ry="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              </span>
            </div>
          </div>
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <label for="password" class="field-label">Password</label>
              <a routerLink="/forgot-password" class="link-accent text-[11px]">Forgot?</a>
            </div>
            <div class="relative">
              <input id="password" class="input peer pr-12 input-surface" [type]="showPassword() ? 'text' : 'password'" name="password" [(ngModel)]="password" required autocomplete="current-password" placeholder="••••••••" aria-required="true" />
        <button type="button"
          (click)="showPassword.set(!showPassword())"
                      [attr.aria-label]="showPassword() ? 'Hide password' : 'Show password'"
                      [attr.aria-pressed]="showPassword()"
                      aria-controls="password"
                      class="absolute inset-y-0 right-1 flex items-center text-meta-muted hover:text-accent focus-ring px-2 rounded transition-colors duration-200">
                <!-- Eye (show) -->
                <svg *ngIf="!showPassword()" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <!-- Eye off (hide) -->
                <svg *ngIf="showPassword()" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.77 21.77 0 0 1 5.06-5.94M9.9 4.24A10.94 10.94 0 0 1 12 5c7 0 11 7 11 7a22 22 0 0 1-2.16 3.19" />
                  <path d="M12 12a3 3 0 0 0-3-3" />
                  <path d="m1 1 22 22" />
                </svg>
              </button>
            </div>
          </div>
          <div class="flex items-center justify-between gap-4 p-1 py-2 text-xs">
            <label class="inline-flex items-center gap-2 cursor-pointer select-none field-label-normal">
              <input type="checkbox" [(ngModel)]="remember" name="remember" class="focus-ring rounded border-border text-accent shadow-sm bg-transparent" aria-checked="remember" />
              <span class="font-medium">Remember me</span>
            </label>
            <div class="text-[11px] text-meta">v1.0</div>
          </div>
          <button class="btn btn-primary elevated-accent w-full justify-center relative overflow-hidden group/button text-sm font-semibold tracking-wide" [disabled]="loading()" aria-live="polite">
            <span class="absolute inset-0 accent-hover-gradient opacity-0 group-enabled:group-hover/button:opacity-100 transition-opacity duration-300"></span>
            <span class="flex items-center gap-2">
              <svg *ngIf="loading()" class="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" opacity="0.25"/><path d="M22 12a10 10 0 0 1-10 10" /></svg>
              {{ loading() ? 'Signing in…' : 'Sign in' }}
            </span>
          </button>
          <p class="text-[11px] text-error font-medium mt-1" *ngIf="error()" role="alert" id="login-error">{{ error() }}</p>
        </form>
        <p id="login-help-block" class="mt-8 text-xs text-meta text-center">Don't have an account? <a routerLink="/register" class="link-accent font-medium">Create one</a></p>
        <div class="mt-10 flex items-center justify-center">
          <div class="h-px w-16 bg-gradient-to-r from-transparent via-slate-300/60 dark:via-slate-600/50 to-transparent"></div>
          <span class="mx-3 text-[10px] tracking-[0.2em] font-semibold uppercase text-meta-muted">Secure</span>
          <div class="h-px w-16 bg-gradient-to-r from-transparent via-slate-300/60 dark:via-slate-600/50 to-transparent"></div>
        </div>
      </div>
    </div>
  </div>
  `,
  styleUrls: ['../auth-shared.scss']
})
export class LoginPageComponent {
  username = '';
  password = '';
  remember = true;
  loading = signal(false);
  error = signal<string | null>(null);
  showPassword = signal(false);

  // Data for animated SVG grid lines
  gridX = Array.from({ length: 13 }, (_, i) => i * 50); // 0..600 step 50 (approx)
  gridY = Array.from({ length: 9 }, (_, i) => i * 52.5); // 0..420 step ~52.5

  // Orbiting packets definitions
  packets = [
    { cx: 300, cy: 130, r: 6, color: '#6366f1', dur: '18s' },
    { cx: 360, cy: 210, r: 5, color: '#a855f7', dur: '12s' },
    { cx: 300, cy: 290, r: 4, color: '#06b6d4', dur: '16s' },
    { cx: 240, cy: 210, r: 5, color: '#818cf8', dur: '14s' }
  ];

  // Document card positions
  docs = [
    { x: 70, y: 110 },
    { x: 120, y: 200 },
    { x: 160, y: 60 }
  ];

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    if (!this.username || !this.password) {
      this.error.set('Please fill in all required fields');
      return;
    }
    
    if (this.username.length < 3) {
      this.error.set('Username must be at least 3 characters long');
      return;
    }
    
    if (this.password.length < 6) {
      this.error.set('Password must be at least 6 characters long');
      return;
    }
    
    this.loading.set(true);
    this.error.set(null);
    
    this.auth.login({ username: this.username, password: this.password }, this.remember).subscribe({
      next: (res) => {
        if (res.success) {
          this.router.navigate(['/conversation']);
        } else {
          this.error.set(res.message || 'Login failed');
        }
        this.loading.set(false);
      },
      error: (e) => { 
        this.error.set(e.error?.detail || e.error?.message || 'Login failed'); 
        this.loading.set(false); 
      }
    });
  }
}
