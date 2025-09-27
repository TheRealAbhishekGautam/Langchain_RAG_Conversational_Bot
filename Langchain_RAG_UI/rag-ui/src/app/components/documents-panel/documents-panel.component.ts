import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DocumentInfo } from '../../types/models';

@Component({
  selector: 'app-documents-panel',
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
  <aside class="h-full flex flex-col bg-theme-elev/95 border-l border-theme/80 backdrop-blur-sm w-72">
    <!-- Header -->
    <div class="p-3 border-b border-theme/80 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="inline-flex items-center justify-center w-7 h-7 rounded-md bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-sm ring-1 ring-white/10">📄</span>
        <h2 class="text-sm font-semibold tracking-tight">Documents</h2>
      </div>
      <a routerLink="/documents" class="btn btn-outline text-[11px] h-8 px-2">Manage</a>
    </div>

    <!-- Search -->
    <div class="px-3 pt-3">
      <div class="relative">
        <input [(ngModel)]="query" type="text" placeholder="Search documents" class="input h-9 w-full" [style.paddingLeft.px]="40"/>
        <svg aria-hidden="true" class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-theme-secondary/70 z-10" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-3.5-3.5"/></svg>
      </div>
    </div>

    <!-- List -->
    <div class="p-3 pt-2 flex-1 overflow-auto scroll-area">
      <p class="text-[11px] uppercase tracking-wide text-theme-muted mb-2">Your Files</p>
      <div class="space-y-1">
        <div *ngFor="let doc of filteredDocuments" class="group px-3 py-2.5 rounded-lg text-sm transition flex items-center gap-3 border border-transparent hover:border-theme/80 hover:bg-theme-secondary/60">
          <span class="w-6 h-6 rounded-md bg-theme-secondary/60 flex items-center justify-center text-[11px]">{{ fileEmoji(doc.filename) }}</span>
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-2 min-w-0">
              <span class="truncate text-theme">{{ doc.filename }}</span>
              <span *ngIf="doc.pages" class="text-[10px] text-theme-muted shrink-0">• {{ doc.pages }}p</span>
            </div>
            <span *ngIf="doc.uploadedAt" class="block text-[10px] text-theme-muted">{{ doc.uploadedAt | date:'mediumDate' }}</span>
          </div>
        </div>
        <p *ngIf="!filteredDocuments.length" class="text-xs text-slate-500">No documents uploaded</p>
      </div>
    </div>

    <div class="mt-auto p-3 border-t border-theme/80">
      <a routerLink="/documents" class="btn btn-outline w-full justify-center text-xs">Upload / Manage</a>
    </div>
  </aside>
  `
})
export class DocumentsPanelComponent {
  @Input() documents: DocumentInfo[] = [];
  query = '';

  get filteredDocuments() {
    const q = this.query.trim().toLowerCase();
    if (!q) return this.documents || [];
    return (this.documents || []).filter(d => (d.filename || '').toLowerCase().includes(q));
  }

  fileEmoji(name?: string) {
    const n = (name || '').toLowerCase();
    if (n.endsWith('.pdf')) return '🧾';
    if (n.endsWith('.doc') || n.endsWith('.docx')) return '📘';
    if (n.endsWith('.txt')) return '📄';
    if (n.endsWith('.ppt') || n.endsWith('.pptx')) return '📊';
    if (n.endsWith('.xls') || n.endsWith('.xlsx')) return '📈';
    return '📄';
  }
}
