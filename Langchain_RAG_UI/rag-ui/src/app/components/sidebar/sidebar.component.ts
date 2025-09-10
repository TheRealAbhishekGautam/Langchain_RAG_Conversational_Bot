import { Component, EventEmitter, Input, Output, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SessionsStore } from '../../stores/sessions.store';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
  <aside class="h-full flex flex-col bg-slate-900 border-r border-slate-800">
    <div class="p-4 border-b border-slate-800 flex items-center justify-between">
      <h1 class="text-lg font-semibold tracking-tight">RAG Chat</h1>
      <button class="btn btn-primary text-xs" (click)="startNew()">New</button>
    </div>

    <div class="p-3">
      <p class="text-[11px] uppercase tracking-wide text-slate-400 mb-1">Recent Sessions</p>
      <div class="space-y-1 max-h-64 overflow-auto pr-1">
        <button *ngFor="let s of sessions()" (click)="selectSession.emit(s.id)"
          class="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-slate-800/80 transition flex flex-col gap-0.5"
          [class.bg-slate-800]="s.id === activeSessionId">
          <span class="font-medium line-clamp-1">{{ s.title || 'Untitled' }}</span>
          <span class="text-[10px] text-slate-400">{{ formatTs(s.updatedAt) }}</span>
        </button>
        <p *ngIf="sessions().length === 0" class="text-xs text-slate-500">No sessions yet</p>
      </div>
    </div>

    <div class="mt-auto p-3 border-t border-slate-800">
      <p class="text-[11px] uppercase tracking-wide text-slate-400 mb-1">Documents</p>
      <div class="flex flex-wrap gap-1 mb-2">
        <span *ngFor="let doc of documents" class="badge" title="{{doc.filename}}">{{ doc.filename | slice:0:12 }}{{ doc.filename.length>12?'…':'' }}</span>
        <span *ngIf="documents?.length===0" class="text-[11px] text-slate-500">No docs</span>
      </div>
      <button class="btn btn-outline w-full justify-center text-xs" (click)="openDocuments.emit()">Manage Documents</button>
    </div>
  </aside>
  `
})
export class SidebarComponent {
  @Input() documents: { filename: string }[] = [];
  @Input() activeSessionId?: string;
  @Output() startNewSession = new EventEmitter<void>();
  @Output() openDocuments = new EventEmitter<void>();
  @Output() selectSession = new EventEmitter<string>();

  constructor(public sessionsStore: SessionsStore) {}

  sessions = this.sessionsStore.sessions;

  startNew() { this.startNewSession.emit(); }

  formatTs(ts: string | number | Date) { return dayjs(ts).fromNow ? dayjs(ts).fromNow() : dayjs(ts).format('HH:mm'); }
}
