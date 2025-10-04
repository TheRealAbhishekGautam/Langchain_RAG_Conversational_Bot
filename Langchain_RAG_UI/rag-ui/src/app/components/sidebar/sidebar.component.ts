import { Component, EventEmitter, Output, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SessionsStore } from '../../stores/sessions.store';
import { OrbitalSystemComponent } from '../shared/orbital-system.component';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, OrbitalSystemComponent],
  styles: [`
    :host { display:block; }
    .scroll-area { scrollbar-width: thin; }
    .scroll-area::-webkit-scrollbar { width: 8px; }
    .scroll-area::-webkit-scrollbar-track { background: transparent; }
    .scroll-area::-webkit-scrollbar-thumb { background: var(--border); border-radius: 9999px; }
    .scroll-area::-webkit-scrollbar-thumb:hover { background: color-mix(in oklab, var(--border), white 10%); }

    /* Sidebar themed surface with subtle gradients and patterns */
    .sidebar-surface {
      position: relative;
      background: var(--bg-elev);
      backdrop-filter: blur(8px);
    }
    .sidebar-surface::before {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
      /* Smooth panel-wide glow: center stays very soft, mid-radius gently brighter, fades to edges */
      background:
        radial-gradient(120% 120% at 50% 50%,
          color-mix(in oklab, var(--accent-1), transparent 98%) 0%,
          color-mix(in oklab, var(--accent-1), transparent 96%) 16%,
          color-mix(in oklab, var(--accent-2), transparent 90%) 38%,
          color-mix(in oklab, var(--accent-2), transparent 86%) 58%,
          color-mix(in oklab, var(--accent-3), transparent 86%) 76%,
          transparent 100%
        ),
        radial-gradient(560px 220px at -10% -20%, color-mix(in oklab, var(--accent-3), transparent 70%), transparent);
      opacity: .6;
      z-index: 1; /* above SVG overlay, below content */
    }
    .sidebar-surface::after {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
      background-image: radial-gradient(color-mix(in oklab, var(--accent-2), transparent 92%) 1px, transparent 1px);
      background-size: 20px 20px;
      mask-image: linear-gradient(180deg, black, transparent 60%);
      opacity: .22;
      z-index: 1; /* above SVG overlay, below content */
    }

    /* Centered decorative SVG overlay */
    .panel-illustration {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      opacity: .38; /* visible but let radial BG shine through */
      z-index: 2; /* above ::before/::after overlays */
    }
    /* size the overlay component itself; child svg is inside another component */
    .panel-illustration app-orbital-system { width: 240px; height: 240px; display: block; }
    /* ensure orbital system is above the radial glow */
    .panel-illustration app-orbital-system { position: relative; z-index: 1; }
    /* Radial gradient glow behind the SVG */
    .panel-illustration .svg-radial-bg {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 380px;
      height: 380px;
      border-radius: 9999px;
      /* True radial glow: multi-stop alpha falloff, clipped to a circle */
      background: radial-gradient(50% 50% at 50% 50%,
        rgba(99, 102, 241, 0.20) 0%,
        rgba(99, 102, 241, 0.14) 30%,
        rgba(56, 189, 248, 0.10) 58%,
        rgba(56, 189, 248, 0.04) 76%,
        rgba(0, 0, 0, 0) 92%);
      background-repeat: no-repeat;
      background-size: 100% 100%;
      clip-path: circle(50% at 50% 50%);
      overflow: hidden;
      opacity: .6;
      z-index: 0;
    }
    @media (min-width: 1280px) {
      .panel-illustration app-orbital-system { width: 260px; height: 260px; }
      .panel-illustration .svg-radial-bg { width: 410px; height: 410px; }
    }
  .sidebar-surface > *:not(.panel-illustration) { position: relative; z-index: 3; }

    /* Intensity toggles */
    .sidebar-surface.surface-intense { background: var(--bg-elev); }
    .sidebar-surface.surface-intense::before {
      background:
        radial-gradient(125% 125% at 50% 50%,
          color-mix(in oklab, var(--accent-1), transparent 96%) 0%,
          color-mix(in oklab, var(--accent-1), transparent 94%) 16%,
          color-mix(in oklab, var(--accent-2), transparent 86%) 38%,
          color-mix(in oklab, var(--accent-2), transparent 82%) 58%,
          color-mix(in oklab, var(--accent-3), transparent 82%) 76%,
          transparent 100%
        ),
        radial-gradient(700px 280px at -10% -20%, color-mix(in oklab, var(--accent-3), transparent 64%), transparent);
      opacity: .68;
    }
    .sidebar-surface.surface-subtle { background: var(--bg-elev); }

    /* Gradient badge for icons */
    .badge-grad {
      background: linear-gradient(135deg,
        color-mix(in oklab, var(--accent-1), transparent 68%) 0%,
        color-mix(in oklab, var(--accent-2), transparent 72%) 60%,
        color-mix(in oklab, var(--accent-3), transparent 76%) 100%);
      border: 1px solid color-mix(in oklab, var(--accent-2), transparent 75%);
      color: white;
      box-shadow: 0 6px 16px -8px color-mix(in oklab, var(--accent-1), transparent 50%);
    }

    /* Fancy hover for list items */
    .item-hover {
      border: 1px solid transparent;
      background: linear-gradient(var(--bg-elev), var(--bg-elev)) padding-box,
                  linear-gradient(135deg, color-mix(in oklab, var(--accent-1), transparent 80%), color-mix(in oklab, var(--accent-2), transparent 85%)) border-box;
      transition: transform .2s ease, box-shadow .2s ease, background .2s ease, border-color .2s ease;
    }
    .item-hover:hover {
      transform: translateY(-1px);
      border-color: transparent;
      box-shadow: 0 10px 12px -12px color-mix(in oklab, var(--accent-1), transparent 40%);
      background: linear-gradient(color-mix(in oklab, var(--bg-elev), transparent 0%), color-mix(in oklab, var(--bg-elev), transparent 0%)) padding-box,
                  linear-gradient(135deg, color-mix(in oklab, var(--accent-1), transparent 65%), color-mix(in oklab, var(--accent-2), transparent 70%)) border-box;
    }
  `],
  template: `
  <aside class="h-full flex flex-col sidebar-surface surface-intense">
    <!-- Decorative centered SVG overlay -->
    <div class="panel-illustration" aria-hidden="true">
      <div class="svg-radial-bg" aria-hidden="true"></div>
      <app-orbital-system [ringColors]="{start: 'var(--accent-1)', middle: 'var(--accent-2)', end: 'var(--accent-3)'}">
        <svg:defs>
          <svg:radialGradient id="aiBrainPulse" cx="50%" cy="50%" r="50%">
            <svg:stop offset="0%" stop-color="var(--accent-1)" stop-opacity="0.9" />
            <svg:stop offset="65%" stop-color="var(--accent-1)" stop-opacity="0.25" />
            <svg:stop offset="100%" stop-color="var(--accent-1)" stop-opacity="0" />
          </svg:radialGradient>
        </svg:defs>
        <!-- Central AI brain with pulsing animation -->
        <svg:g transform="translate(150,150)">
          <svg:circle r="70" fill="url(#aiBrainPulse)">
            <svg:animate attributeName="r" values="58;78;58" dur="7s" repeatCount="indefinite" />
            <svg:animate attributeName="opacity" values="0.6;0.9;0.6" dur="7s" repeatCount="indefinite" />
          </svg:circle>
          <!-- AI Brain Icon -->
          <svg:g fill="white" opacity="0.9">
            <svg:path d="M-12,-8 C-16,-8 -20,-4 -20,0 C-20,4 -16,8 -12,8 L12,8 C16,8 20,4 20,0 C20,-4 16,-8 12,-8 Z" />
            <svg:circle cx="-8" cy="-2" r="2" fill="var(--accent-1)" opacity="0.8">
              <svg:animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
            </svg:circle>
            <svg:circle cx="0" cy="-2" r="2" fill="var(--accent-2)" opacity="0.8">
              <svg:animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin="0.5s" />
            </svg:circle>
            <svg:circle cx="8" cy="-2" r="2" fill="var(--accent-3)" opacity="0.8">
              <svg:animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin="1s" />
            </svg:circle>
            <svg:path d="M-6,2 Q0,6 6,2" stroke="var(--accent-1)" stroke-width="1.5" fill="none" opacity="0.7" />
          </svg:g>
        </svg:g>
      </app-orbital-system>
        
    </div>
    <!-- Header -->
    <div class="p-3 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="inline-flex items-center justify-center w-7 h-7 rounded-md badge-grad text-white ring-1 ring-white/10">
          <!-- Chat bubble icon -->
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a4 4 0 0 1-4 4H8l-5 3 1.5-3H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8z" fill="currentColor"/>
          </svg>
        </span>
        <h2 class="text-sm font-semibold tracking-tight">Sessions</h2>
      </div>
      <button class="btn btn-primary text-[11px] h-8 px-3" (click)="startNew()">New</button>
    </div>

    <!-- Search -->
    <div class="px-3 pt-3">
      <div class="relative">
        <input [(ngModel)]="query" type="text" placeholder="Search sessions" class="input h-9 w-full" [style.paddingLeft.px]="40"/>
        <svg aria-hidden="true" class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-theme-secondary/70 z-10" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-3.5-3.5"/></svg>
      </div>
    </div>

    <!-- List -->
    <div class="p-3 pt-2 flex-1 overflow-auto scroll-area">
      <p class="text-[11px] uppercase tracking-wide text-theme-muted mb-2">Recent</p>
      <div class="space-y-1">
        <button *ngFor="let s of filteredSessions()" (click)="selectSession.emit(s.id)"
          class="group w-full text-left px-3 py-2.5 rounded-lg text-sm transition flex items-start gap-3 item-hover">
          <span class="w-6 h-6 rounded-md bg-theme-secondary/60 flex items-center justify-center text-[11px]">💬</span>
          <span class="flex-1 min-w-0">
            <span class="block font-medium truncate text-theme">{{ s.title || 'Untitled session' }}</span>
            <span class="block text-[10px] text-theme-muted">{{ formatTs(s.updatedAt) }}</span>
          </span>
        </button>
        <p *ngIf="filteredSessions().length === 0" class="text-xs text-slate-500">No sessions yet</p>
      </div>
    </div>
  </aside>
  `
})
export class SidebarComponent {
  @Output() startNewSession = new EventEmitter<void>();
  @Output() selectSession = new EventEmitter<string>();

  constructor(public sessionsStore: SessionsStore) {}

  query = '';
  sessions = this.sessionsStore.sessions;
  filteredSessions = computed(() => {
    const q = this.query.trim().toLowerCase();
    const list = this.sessions();
    if (!q) return list;
    return list.filter(s => (s.title || '').toLowerCase().includes(q));
  });

  startNew() { this.startNewSession.emit(); }

  formatTs(ts: string | number | Date) { return dayjs(ts).fromNow ? dayjs(ts).fromNow() : dayjs(ts).format('HH:mm'); }
}
