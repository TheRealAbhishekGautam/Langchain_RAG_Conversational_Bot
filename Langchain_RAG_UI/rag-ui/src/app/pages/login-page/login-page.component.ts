import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

// New lightweight animated SVG crafted specifically for the login page (different from hero component)
// Focus: subtle, professional, AI + document ingestion vibe without being too busy.

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="min-h-screen w-full flex flex-col lg:flex-row overflow-hidden login-bg relative contrast-scope -mt-20">
    <!-- Left Visual / Branding Panel -->
    <div class="relative flex-1 flex items-center justify-center px-8 py-12 isolate group overflow-hidden">
      <!-- Ambient gradient blobs (muted in light, vivid in dark) -->
      <div class="pointer-events-none absolute inset-0 mix-blend-normal">
        <div class="themed-blob blob-a"></div>
        <div class="themed-blob blob-b"></div>
      </div>
      <!-- Glass card with SVG -->
  <div class="relative w-full max-w-xl aspect-[4/3] lg:aspect-[5/4] rounded-3xl border border-white/10 dark:border-white/5 backdrop-blur-xl bg-white/50 dark:bg-white/5 shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_4px_24px_-4px_rgba(0,0,0,0.25),0_8px_40px_-6px_rgba(79,70,229,0.25)] p-6 flex flex-col">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2 font-semibold text-sm tracking-tight text-indigo-600 dark:text-indigo-300">
            <span class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 text-white font-bold shadow">AI</span>
            <span>Context Engine</span>
          </div>
          <div class="flex gap-1 opacity-60">
            <span class="h-2 w-2 rounded-full bg-indigo-400 animate-ping"></span>
            <span class="h-2 w-2 rounded-full bg-violet-400 animate-ping [animation-delay:300ms]"></span>
            <span class="h-2 w-2 rounded-full bg-teal-400 animate-ping [animation-delay:600ms]"></span>
          </div>
        </div>
        <div class="relative flex-1 rounded-xl overflow-hidden ring-1 ring-inset ring-white/20 dark:ring-white/10 bg-gradient-to-br from-indigo-50/60 via-white/40 to-indigo-100/50 dark:from-indigo-900/20 dark:via-slate-900/20 dark:to-fuchsia-900/10">
          <svg class="absolute inset-0 w-full h-full" viewBox="0 0 600 420" fill="none">
            <defs>
              <linearGradient id="lg1" x1="0" y1="0" x2="600" y2="420" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#6366f1" stop-opacity="0.15" />
                <stop offset="60%" stop-color="#a855f7" stop-opacity="0.1" />
                <stop offset="100%" stop-color="#14b8a6" stop-opacity="0.15" />
              </linearGradient>
              <radialGradient id="pulseCore" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#6366f1" stop-opacity="0.9" />
                <stop offset="70%" stop-color="#6366f1" stop-opacity="0.2" />
                <stop offset="100%" stop-color="#6366f1" stop-opacity="0" />
              </radialGradient>
              <linearGradient id="wire" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#6366f1" />
                <stop offset="50%" stop-color="#a855f7" />
                <stop offset="100%" stop-color="#06b6d4" />
              </linearGradient>
              <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="4" result="colored" />
                <feMerge>
                  <feMergeNode in="colored" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <!-- Soft grid -->
            <g stroke="url(#lg1)" stroke-width="0.6" opacity="0.25">
              <path *ngFor="let i of gridX" [attr.d]="'M '+i+' 0 V 420'" />
              <path *ngFor="let j of gridY" [attr.d]="'M 0 '+j+' H 600'" />
            </g>
            <!-- Pulsing core -->
            <circle cx="300" cy="210" r="54" fill="url(#pulseCore)">
              <animate attributeName="r" values="46;58;46" dur="6s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;1;0.7" dur="6s" repeatCount="indefinite" />
            </circle>
            <!-- Core ring -->
            <circle cx="300" cy="210" r="42" stroke="#818cf8" stroke-width="2" stroke-dasharray="4 6" filter="url(#glow)" fill="none">
              <animateTransform attributeName="transform" type="rotate" values="0 300 210;360 300 210" dur="14s" repeatCount="indefinite" />
            </circle>
            <circle cx="300" cy="210" r="30" stroke="#a855f7" stroke-width="1.5" stroke-dasharray="2 4" fill="none">
              <animateTransform attributeName="transform" type="rotate" values="360 300 210;0 300 210" dur="10s" repeatCount="indefinite" />
            </circle>
            <!-- Orbiting packets -->
            <g *ngFor="let p of packets; let idx = index" [attr.filter]="'url(#glow)'">
              <circle [attr.cx]="p.cx" [attr.cy]="p.cy" [attr.r]="p.r" [attr.fill]="p.color">
                <animateTransform attributeName="transform" type="rotate" [attr.values]="'0 300 210;360 300 210'" [attr.dur]="p.dur" repeatCount="indefinite" />
              </circle>
            </g>
            <!-- Flow wires -->
            <path d="M90 140 Q200 80 300 210" stroke="url(#wire)" stroke-width="2" fill="none" stroke-linecap="round">
              <animate attributeName="stroke-dasharray" values="0 300;150 150;300 0" dur="5s" repeatCount="indefinite" />
            </path>
            <path d="M510 300 Q420 340 300 210" stroke="url(#wire)" stroke-width="2" fill="none" stroke-linecap="round">
              <animate attributeName="stroke-dasharray" values="0 300;150 150;300 0" dur="5s" repeatCount="indefinite" begin="2.5s" />
            </path>
            <!-- Ingested doc cards -->
            <g *ngFor="let d of docs" [attr.transform]="'translate('+d.x+','+d.y+')'" opacity="0.9">
              <rect width="72" height="52" rx="10" fill="#ffffff" class="dark:fill-slate-800" stroke="#e2e8f0" stroke-width="1" filter="url(#glow)"></rect>
              <g stroke="#94a3b8" stroke-width="2" stroke-linecap="round" opacity="0.5">
                <line x1="14" y1="16" x2="54" y2="16" />
                <line x1="14" y1="26" x2="46" y2="26" />
                <line x1="14" y1="36" x2="50" y2="36" />
              </g>
              <circle cx="60" cy="14" r="5" fill="#6366f1" />
            </g>
            <!-- Output bubble -->
            <g transform="translate(470,130)">
              <rect x="-70" y="-28" width="140" height="78" rx="18" fill="url(#lg1)" stroke="#6366f1" stroke-width="1.5" filter="url(#glow)" />
              <text x="0" y="-4" text-anchor="middle" class="font-medium" fill="#312e81" font-size="14" opacity="0.85">Semantic Match</text>
              <text x="0" y="14" text-anchor="middle" fill="#4338ca" font-size="11" opacity="0.7">Context Ranked</text>
              <text x="0" y="30" text-anchor="middle" fill="#6366f1" font-size="11" opacity="0.7">+ Sources</text>
            </g>
          </svg>
          <!-- Subtle gradient overlay -->
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.5),transparent_60%)] dark:bg-[radial-gradient(circle_at_70%_70%,rgba(99,102,241,0.15),transparent_70%)] pointer-events-none"></div>
        </div>
        <div class="mt-5 text-[11px] tracking-wide font-medium flex items-center gap-2 text-slate-600 dark:text-slate-300">
          <span class="inline-flex h-5 w-5 items-center justify-center rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 text-[10px] font-semibold">∞</span>
          Enhance retrieval with adaptive embeddings & intent aware ranking.
        </div>
      </div>
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
        <form class="space-y-5 group/form" (ngSubmit)="submit()" autocomplete="on" novalidate role="form" aria-describedby="login-help-block">
          <div class="space-y-2">
            <label for="username" class="field-label">Username</label>
            <div class="relative">
              <input id="username" class="input peer pr-10 input-surface" name="username" [(ngModel)]="username" required autocomplete="username" placeholder="john.doe" aria-required="true" />
              <span class="pointer-events-none absolute inset-y-0 right-3 flex items-center icon-muted peer-focus:text-accent transition-colors duration-200">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Z"/><path d="M4.27 20.66a8 8 0 0 1 15.46 0"/></svg>
              </span>
            </div>
          </div>
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <label for="password" class="field-label">Password</label>
              <a routerLink="/forgot-password" class="link-accent text-[11px]">Forgot?</a>
            </div>
            <div class="relative">
              <input id="password" class="input peer pr-10 input-surface" type="password" name="password" [(ngModel)]="password" required autocomplete="current-password" placeholder="••••••••" aria-required="true" />
              <span class="pointer-events-none absolute inset-y-0 right-3 flex items-center icon-muted peer-focus:text-accent transition-colors duration-200">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
              </span>
            </div>
          </div>
          <div class="flex items-center justify-between gap-4 pt-1 text-xs">
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
  styles: [`
    :host { display: contents; }
    /* ========== Contrast System & Background ========= */
    .login-bg { 
      --bg1: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 35%, #eef2ff 70%, #ffffff 100%);
      --grid-color: rgba(99,102,241,0.08);
      --radial1: radial-gradient(circle at 18% 28%, rgba(99,102,241,0.18), transparent 55%);
      --radial2: radial-gradient(circle at 82% 72%, rgba(20,184,166,0.15), transparent 60%);
      background:
        linear-gradient(0deg,rgba(255,255,255,0.6),rgba(255,255,255,0.6)),
        var(--radial1),
        var(--radial2),
        var(--bg1);
    }
    .login-bg:before { /* fine grid using repeating linear gradients */
      content: ""; position:absolute; inset:0; pointer-events:none; z-index:0;
      background:
        repeating-linear-gradient(
          to right,
          transparent 0 46px,
          var(--grid-color) 46px 47px,
          transparent 47px 94px
        ),
        repeating-linear-gradient(
          to bottom,
          transparent 0 46px,
          var(--grid-color) 46px 47px,
          transparent 47px 94px
        );
      mask: radial-gradient(circle at 50% 45%, rgba(0,0,0,0.55), transparent 75%);
      opacity:.5;
    }
    .login-bg:after { /* soft vignette */
      content:""; position:absolute; inset:0; pointer-events:none; z-index:0;
      background:radial-gradient(circle at 50% 50%, rgba(0,0,0,0.05), transparent 70%);
      mix-blend-mode:multiply; opacity:.6;
    }
    /* Dark mode adjustments */
    :host-context(.dark) .login-bg {
      --bg1: linear-gradient(145deg,#0f172a 0%,#111827 35%,#1e1b4b 70%,#1e293b 100%);
      --grid-color: rgba(99,102,241,0.14);
      --radial1: radial-gradient(circle at 20% 30%, rgba(91,33,182,0.35), transparent 62%);
      --radial2: radial-gradient(circle at 78% 70%, rgba(8,145,178,0.28), transparent 60%);
      background:
        linear-gradient(0deg,rgba(17,24,39,0.65),rgba(17,24,39,0.65)),
        var(--radial1),
        var(--radial2),
        var(--bg1);
    }
    :host-context(.dark) .login-bg:after {
      background:radial-gradient(circle at 60% 55%, rgba(255,255,255,0.08), transparent 70%);
      mix-blend-mode:normal; opacity:.9;
    }
    /* Themed blobs (muted in light) */
    .themed-blob { position:absolute; border-radius:9999px; filter:blur(72px); animation: blobFloat 18s ease-in-out infinite; opacity:.35; }
    .blob-a { top:-120px; left:-140px; width:420px; height:420px; background:linear-gradient(145deg,#6366f1,#a855f7); animation-delay:0s; }
    .blob-b { bottom:-160px; right:-160px; width:480px; height:480px; background:linear-gradient(145deg,#14b8a6,#6366f1); animation-delay:6s; }
    /* Light mode downplay */
    @media (prefers-reduced-motion: reduce) { .themed-blob { animation:none; } }
    :host-context(.dark) .themed-blob { opacity:.55; filter:blur(90px); }
    @keyframes blobFloat { 0%,100% { transform:translate3d(0,0,0) scale(1); } 33% { transform:translate3d(40px, -30px,0) scale(1.08); } 66% { transform:translate3d(-30px, 35px,0) scale(0.95);} }
    .animate-pulse-slow { animation: pulseSlow 6s ease-in-out infinite; }
    .animate-pulse-slower { animation: pulseSlower 10s ease-in-out infinite; }
    @keyframes pulseSlow { 0%,100% { transform: scale(1); opacity: .6 } 50% { transform: scale(1.15); opacity: 1 } }
    @keyframes pulseSlower { 0%,100% { transform: scale(1); opacity: .5 } 50% { transform: scale(1.2); opacity: .9 } }
    svg text { font-family: 'Inter', system-ui, sans-serif; }

    /* ========== New Contrast Variables ========= */
    .contrast-scope { 
      --surface: rgba(255,255,255,0.75);
      --surface-alt: rgba(255,255,255,0.5);
      --surface-border: rgba(15,23,42,0.08);
      --surface-inset: rgba(255,255,255,0.7);
      --text: #0f172a;
      --text-muted: #475569;
      --text-faint: #64748b;
      --accent: #6366f1;
      --accent-rgb: 99,102,241;
      --danger: #dc2626;
      --error-bg: rgba(220,38,38,0.08);
      --focus-ring: 0 0 0 2px rgba(255,255,255,0.9),0 0 0 4px rgba(var(--accent-rgb),0.45);
      --input-bg: rgba(255,255,255,0.55);
      --input-border: rgba(15,23,42,0.15);
    }
    :host-context(.dark) .contrast-scope { 
      --surface: rgba(17,24,39,0.85);
      --surface-alt: rgba(30,41,59,0.6);
      --surface-border: rgba(255,255,255,0.08);
      --surface-inset: rgba(255,255,255,0.04);
      --text: #f1f5f9;
      --text-muted: #cbd5e1;
      --text-faint: #64748b;
      --accent: #818cf8;
      --accent-rgb: 129,140,248;
      --danger: #f87171;
      --error-bg: rgba(248,113,113,0.12);
      --focus-ring: 0 0 0 2px rgba(0,0,0,0.75),0 0 0 4px rgba(var(--accent-rgb),0.5);
      --input-bg: rgba(255,255,255,0.07);
      --input-border: rgba(255,255,255,0.15);
    }

    /* ========== Form Shell ========= */
    .form-shell { 
      background: var(--surface-alt); 
      backdrop-filter: blur(22px) saturate(140%);
      -webkit-backdrop-filter: blur(22px) saturate(140%);
      border: 1px solid var(--surface-border);
      border-radius: 1.25rem;
      box-shadow:
        0 2px 4px -2px rgba(0,0,0,0.15),
        0 10px 30px -10px rgba(0,0,0,0.25),
        0 0 0 1px rgba(255,255,255,0.15) inset;
      padding: 1.75rem 1.5rem 2.25rem;
      position: relative;
    }
    @media (min-width: 640px) { .form-shell { padding: 2.25rem 2rem 2.75rem; } }
    .form-shell:before { content:""; position:absolute; inset:0; pointer-events:none; border-radius:inherit; background:linear-gradient(145deg,var(--surface-inset),transparent 70%); opacity:.85; mix-blend-mode:overlay; }
    :host-context(.dark) .form-shell:before { opacity:.25; mix-blend-mode:normal; }
    .form-bg-layer { background: linear-gradient(160deg,rgba(var(--accent-rgb),0.08),transparent 45%,rgba(20,184,166,0.12)); opacity:.6; }
    :host-context(.dark) .form-bg-layer { background: linear-gradient(150deg,rgba(var(--accent-rgb),0.15),transparent 50%,rgba(8,145,178,0.18)); opacity:.5; }

    /* ========== Typography & Elements ========= */
    .heading-gradient { background: linear-gradient(90deg,var(--accent),#a855f7,#14b8a6); -webkit-background-clip: text; color: transparent; }
    .field-label { font-size: 0.65rem; letter-spacing: .08em; text-transform: uppercase; font-weight:600; color: var(--text-faint); }
    .field-label-normal { color: var(--text-faint); }
    .text-meta { color: var(--text-muted); }
    .text-meta-muted { color: var(--text-faint); }
    .icon-muted { color: var(--text-faint); }
    .link-accent { color: var(--accent); font-weight:500; text-decoration:none; position:relative; }
    .link-accent:after { content:""; position:absolute; left:0; right:0; bottom:-2px; height:2px; background:linear-gradient(90deg,var(--accent),#a855f7,#14b8a6); transform:scaleX(0); transform-origin:left; transition:transform .35s ease; border-radius:2px; }
    .link-accent:hover:after { transform:scaleX(1); }

    /* ========== Inputs ========= */
    .input-surface { background: var(--input-bg); border:1px solid var(--input-border); color: var(--text); transition: background .25s, border-color .25s, box-shadow .25s; }
    .input-surface::placeholder { color: var(--text-faint); }
    .input-surface:focus { border-color: var(--accent); background: rgba(var(--accent-rgb),0.08); box-shadow: var(--focus-ring); outline:none; }
    :host-context(.dark) .input-surface:focus { background: rgba(var(--accent-rgb),0.15); }

    /* ========== Buttons ========= */
    .accent-hover-gradient { background: linear-gradient(90deg,var(--accent),#a855f7,#14b8a6); mix-blend-mode:overlay; }
    .elevated-accent { box-shadow: 0 4px 18px -4px rgba(var(--accent-rgb),0.55), 0 0 0 1px rgba(var(--accent-rgb),0.3) inset; }
    .elevated-accent:active { transform: translateY(1px); }

    /* ========== Error State ========= */
    .text-error { color: var(--danger); }
    .text-error:before { content:""; display:inline-block; width:6px; height:6px; border-radius:9999px; background:var(--danger); margin-right:6px; vertical-align:middle; box-shadow:0 0 0 3px var(--error-bg); }

    /* ========== Accessibility Focus Helpers ========= */
    .focus-ring:focus-visible { box-shadow: var(--focus-ring); outline:none; }

    /* Reduce blob intensity behind form on narrow screens */
    @media (max-width: 1023px) { .themed-blob { opacity:.25; filter:blur(60px); } }
  `]
})
export class LoginPageComponent {
  username = '';
  password = '';
  remember = true;
  loading = signal(false);
  error = signal<string | null>(null);

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
