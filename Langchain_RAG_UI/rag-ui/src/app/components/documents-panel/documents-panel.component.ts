import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DocumentInfo } from '../../types/models';
import { OrbitalSystemComponent } from '../shared/orbital-system.component';

@Component({
  selector: 'app-documents-panel',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, OrbitalSystemComponent],
  styles: [`
    :host { display:block; }
    .scroll-area { scrollbar-width: thin; }
    .scroll-area::-webkit-scrollbar { width: 8px; }
    .scroll-area::-webkit-scrollbar-track { background: transparent; }
    .scroll-area::-webkit-scrollbar-thumb { background: var(--border); border-radius: 9999px; }
    .scroll-area::-webkit-scrollbar-thumb:hover { background: color-mix(in oklab, var(--border), white 10%); }

    /* Themed surface with subtle gradient and pattern */
    .panel-surface {
      position: relative;
      background: var(--bg-elev);
      backdrop-filter: blur(8px);
    }
    .panel-surface::before {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
      /* Smooth panel-wide glow: very light center, soft mid, fades outward (matched to Sessions panel) */
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
      opacity: .6; /* matched */
      z-index: 1; /* above SVG overlay, below content */
    }
    .panel-surface::after {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
      /* Match Sessions pattern accent */
      background-image: radial-gradient(color-mix(in oklab, var(--accent-2), transparent 92%) 1px, transparent 1px);
      background-size: 20px 20px;
      mask-image: linear-gradient(180deg, black, transparent 60%);
      opacity: .22;
      z-index: 1; /* above SVG overlay, below content */
    }

    /* Intensity toggles */
    .panel-surface.surface-intense { background: var(--bg-elev); }
    .panel-surface.surface-intense::before {
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
    .panel-surface.surface-subtle { background: var(--bg-elev); }

    .badge-grad {
      background: linear-gradient(135deg,
        color-mix(in oklab, var(--accent-1), transparent 68%) 0%,
        color-mix(in oklab, var(--accent-2), transparent 72%) 60%,
        color-mix(in oklab, var(--accent-3), transparent 76%) 100%);
      border: 1px solid color-mix(in oklab, var(--accent-2), transparent 75%);
      color: white;
      box-shadow: 0 6px 16px -8px color-mix(in oklab, var(--accent-1), transparent 50%);
    }

    .doc-item {
      border: 1px solid transparent;
      background: linear-gradient(var(--bg-elev), var(--bg-elev)) padding-box,
                  linear-gradient(135deg, color-mix(in oklab, var(--accent-2), transparent 80%), color-mix(in oklab, var(--accent-1), transparent 85%)) border-box;
      transition: transform .2s ease, box-shadow .2s ease, background .2s ease, border-color .2s ease;
    }
    .doc-item:hover {
      transform: translateY(-1px);
      box-shadow: 0 10px 24px -12px color-mix(in oklab, var(--accent-2), transparent 40%);
      background: linear-gradient(color-mix(in oklab, var(--bg-elev), transparent 0%), color-mix(in oklab, var(--bg-elev), transparent 0%)) padding-box,
                  linear-gradient(135deg, color-mix(in oklab, var(--accent-2), transparent 65%), color-mix(in oklab, var(--accent-1), transparent 70%)) border-box;
    }

    /* Centered decorative SVG overlay */
    .panel-illustration {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      opacity: .38; /* allow radial background to be seen */
      z-index: 2; /* place above ::before/::after overlays */
    }
    .panel-illustration app-orbital-system { width: 240px; height: 240px; display:block; position: relative; z-index: 1; }
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
        rgba(56, 189, 248, 0.20) 0%,
        rgba(56, 189, 248, 0.14) 30%,
        rgba(99, 102, 241, 0.10) 58%,
        rgba(99, 102, 241, 0.04) 76%,
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
  .panel-surface > *:not(.panel-illustration) { position: relative; z-index: 3; }

    /* Remove duplicate overlay and sizing rules that could override z-index */
  `],
  template: `
  <aside class="h-full flex flex-col panel-surface surface-intense w-72">
    <!-- Decorative centered SVG overlay -->
    <div class="panel-illustration" aria-hidden="true">
      <div class="svg-radial-bg" aria-hidden="true"></div>
      <app-orbital-system [ringColors]="{start: 'var(--accent-2)', middle: 'var(--accent-1)', end: 'var(--accent-3)'}">
        <svg:defs>
          <svg:radialGradient id="documentPulse" cx="50%" cy="50%" r="50%">
            <svg:stop offset="0%" stop-color="var(--accent-2)" stop-opacity="0.9" />
            <svg:stop offset="65%" stop-color="var(--accent-2)" stop-opacity="0.25" />
            <svg:stop offset="100%" stop-color="var(--accent-2)" stop-opacity="0" />
          </svg:radialGradient>
        </svg:defs>
        <!-- Document Stack Center Icon -->
        <svg:g transform="translate(150,150)">
          <svg:circle r="70" fill="url(#documentPulse)">
            <svg:animate attributeName="r" values="58;78;58" dur="7s" repeatCount="indefinite" />
            <svg:animate attributeName="opacity" values="0.6;0.9;0.6" dur="7s" repeatCount="indefinite" />
          </svg:circle>
          <!-- Document Stack Icon -->
          <svg:g fill="white" opacity="0.9">
            <svg:rect x="-10" y="-12" width="16" height="20" rx="2" fill="var(--accent-2)" opacity="0.8">
              <svg:animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
            </svg:rect>
            <svg:rect x="-8" y="-10" width="16" height="20" rx="2" fill="var(--accent-1)" opacity="0.9">
              <svg:animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" begin="1s" />
            </svg:rect>
            <svg:rect x="-6" y="-8" width="16" height="20" rx="2" fill="white" opacity="1" />
            <!-- Document lines -->
            <svg:line x1="-3" y1="-4" x2="7" y2="-4" stroke="var(--accent-2)" stroke-width="1" opacity="0.7" />
            <svg:line x1="-3" y1="-1" x2="7" y2="-1" stroke="var(--accent-2)" stroke-width="1" opacity="0.7" />
            <svg:line x1="-3" y1="2" x2="5" y2="2" stroke="var(--accent-2)" stroke-width="1" opacity="0.7" />
            <svg:line x1="-3" y1="5" x2="7" y2="5" stroke="var(--accent-2)" stroke-width="1" opacity="0.7" />
            <svg:line x1="-3" y1="8" x2="4" y2="8" stroke="var(--accent-2)" stroke-width="1" opacity="0.7" />
          </svg:g>
        </svg:g>
      </app-orbital-system>
    </div>
    
    <!-- Fixed Top Section -->
    <div class="flex-shrink-0 space-y-3 pt-2">
      <!-- Header -->
      <div class="px-4 pt-4 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="inline-flex items-center justify-center w-7 h-7 rounded-md badge-grad text-white ring-1 ring-white/10">📄</span>
          <h2 class="text-sm font-semibold tracking-tight">Documents</h2>
        </div>
        <a routerLink="/documents" class="btn btn-outline text-[11px] h-8 px-2">Manage</a>
      </div>

      <!-- Search -->
      <div class="p-4 pt-2">
        <div class="relative">
          <input [(ngModel)]="query" type="text" placeholder="Search documents" class="input h-9 w-full" [style.paddingLeft.px]="40"/>
          <svg aria-hidden="true" class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-theme-secondary/70 z-10" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-3.5-3.5"/></svg>
        </div>
      </div>
    </div>

    <!-- Scrollable Middle Section -->
    <div class="flex-1 min-h-0 overflow-hidden">
      <div class="h-full overflow-y-auto scroll-area">
        <div class="px-4 pb-6">
          <div class="mb-3">
            <p class="text-[11px] uppercase tracking-wide text-theme-muted mb-3">Your Files</p>
          </div>
          <div class="space-y-3">
            <div *ngFor="let doc of filteredDocuments" class="group px-3 py-3 rounded-lg text-sm transition flex items-center gap-3 doc-item">
              <span class="w-6 h-6 rounded-md bg-theme-secondary/60 flex items-center justify-center text-[11px] shrink-0">{{ fileEmoji(doc.filename) }}</span>
              <div class="min-w-0 flex-1">
                <div class="flex items-center gap-2 min-w-0 mb-1">
                  <span class="truncate text-theme font-medium leading-5">{{ doc.filename }}</span>
                  <span *ngIf="doc.pages" class="text-[10px] text-theme-muted shrink-0">• {{ doc.pages }}p</span>
                </div>
                <span *ngIf="doc.uploadedAt" class="block text-[10px] text-theme-muted">{{ doc.uploadedAt | date:'mediumDate' }}</span>
              </div>
              <span *ngIf="doc.size" class="text-[10px] text-theme-muted shrink-0">{{ doc.size }}</span>
            </div>
            <div *ngIf="filteredDocuments.length === 0" class="px-3 py-8 text-center">
              <p class="text-xs text-slate-500">No documents found</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Fixed Bottom Section (for future use) -->
    <!-- <div class="flex-shrink-0 p-3 border-t border-theme/20">
      Bottom content here if needed
    </div> -->
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
