import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styles: [`
    :host { display:block; }
    header.top-bar { backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); }
    /* No pseudo-element / overlay: completely transparent */
    .brand-gradient { font-weight:600; background:linear-gradient(to right,#38bdf8,#818cf8,#a855f7); -webkit-background-clip:text; background-clip:text; color:transparent; letter-spacing:-.015em; }
  `],
  template: `
  <header class="top-bar sticky top-0 z-30 bg-transparent backdrop-blur-xl h-20">
    <div class="max-w-7xl mx-auto px-4 h-full flex items-center justify-between gap-4">
      <!-- Brand -->
      <a routerLink="/" class="flex items-center gap-3 group select-none">
        <span class="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-sky-500 via-indigo-500 to-purple-600 text-white shadow-md ring-1 ring-white/10 transition-transform group-hover:scale-110">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2l3.5 7H22l-5.5 4 2 8L12 17l-6.5 4 2-8L2 9h6.5L12 2z" fill="currentColor"/></svg>
        </span>
        <div class="flex flex-col -space-y-0.5">
          <span class="brand-gradient">Ask The Document</span>
          <span class="text-[10px] uppercase tracking-wider text-theme-secondary/60">Conversational RAG</span>
        </div>
      </a>

      <!-- Nav -->
      <nav class="hidden md:flex items-center gap-1 text-sm font-medium h-full">
        <a [routerLink]="['/']" routerLinkActive="text-theme" class="relative px-4 py-2 rounded-md text-theme-secondary/80 hover:text-theme transition-colors group">Home <span class="pointer-events-none absolute inset-x-2 -bottom-px h-px bg-gradient-to-r from-transparent via-sky-500/0 to-transparent opacity-0 group-hover:opacity-70 transition-opacity"></span></a>
        <a href="/" fragment="features" class="relative px-4 py-2 rounded-md text-theme-secondary/80 hover:text-theme transition-colors group">Features <span class="pointer-events-none absolute inset-x-2 -bottom-px h-px bg-gradient-to-r from-transparent via-sky-500/0 to-transparent opacity-0 group-hover:opacity-70 transition-opacity"></span></a>
        <a href="/" fragment="pricing" class="relative px-4 py-2 rounded-md text-theme-secondary/80 hover:text-theme transition-colors group">Pricing <span class="pointer-events-none absolute inset-x-2 -bottom-px h-px bg-gradient-to-r from-transparent via-sky-500/0 to-transparent opacity-0 group-hover:opacity-70 transition-opacity"></span></a>
      </nav>

      <!-- Right Actions -->
      <div class="flex items-center gap-2">
        <button class="btn btn-outline text-xs h-9 px-3" (click)="theme.toggle()" [attr.aria-label]="theme.theme()==='dark' ? 'Switch to light mode' : 'Switch to dark mode'">
          {{ theme.theme()==='dark' ? '☀️' : '🌙' }}
        </button>
        <ng-container *ngIf="auth.user(); else guestLinks">
          <a routerLink="/conversation" class="btn btn-outline text-xs h-9 px-4">Conversations</a>
          <a routerLink="/documents" class="btn btn-outline text-xs h-9 px-4">Documents</a>
          <button class="btn btn-primary text-xs h-9 px-4" (click)="logout()">Logout</button>
        </ng-container>
        <ng-template #guestLinks>
          <a routerLink="/login" class="btn btn-outline text-xs h-9 px-4">Sign in</a>
          <a routerLink="/register" class="btn btn-primary text-xs h-9 px-4">Get started</a>
        </ng-template>
      </div>
    </div>
  </header>
  `
})
export class TopBarComponent {
  constructor(public theme: ThemeService, public auth: AuthService, private router: Router) {}

  logout() { 
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
