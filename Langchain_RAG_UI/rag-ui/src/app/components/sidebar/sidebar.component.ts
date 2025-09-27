import { Component, EventEmitter, Output, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SessionsStore } from '../../stores/sessions.store';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  styles: [`
    :host { display:block; }
    .scroll-area { scrollbar-width: thin; }
    .scroll-area::-webkit-scrollbar { width: 8px; }
    .scroll-area::-webkit-scrollbar-track { background: transparent; }
    .scroll-area::-webkit-scrollbar-thumb { background: var(--border); border-radius: 9999px; }
    .scroll-area::-webkit-scrollbar-thumb:hover { background: color-mix(in oklab, var(--border), white 10%); }
  `],
  template: `
  <aside class="h-full flex flex-col bg-theme-elev/95 border-r border-theme/80 backdrop-blur-sm">
    <!-- Header -->
    <div class="p-3 border-b border-theme/80 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="inline-flex items-center justify-center w-7 h-7 rounded-md bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-sm ring-1 ring-white/10">
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
          class="group w-full text-left px-3 py-2.5 rounded-lg text-sm transition flex items-start gap-3 border border-transparent hover:border-theme/80 hover:bg-theme-secondary/60">
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
