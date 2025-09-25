import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

// Standalone shared illustration extracted from login page so it can be reused on register page.
// Inputs allow minor customization if needed later (e.g., aria labels, variant toggles).

@Component({
  selector: 'app-auth-illustration',
  standalone: true,
  imports: [CommonModule],
  template: `
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
        <!-- Grid lines generated in TS for easier reuse: we'll just replicate structure here via *ngFor over arrays -->
        <g stroke="url(#lg1)" stroke-width="0.6" opacity="0.25">
          <path *ngFor="let i of gridX" [attr.d]="'M '+i+' 0 V 420'" />
          <path *ngFor="let j of gridY" [attr.d]="'M 0 '+j+' H 600'" />
        </g>
        <circle cx="300" cy="210" r="54" fill="url(#pulseCore)">
          <animate attributeName="r" values="46;58;46" dur="6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;1;0.7" dur="6s" repeatCount="indefinite" />
        </circle>
        <circle cx="300" cy="210" r="42" stroke="#818cf8" stroke-width="2" stroke-dasharray="4 6" filter="url(#glow)" fill="none">
          <animateTransform attributeName="transform" type="rotate" values="0 300 210;360 300 210" dur="14s" repeatCount="indefinite" />
        </circle>
        <circle cx="300" cy="210" r="30" stroke="#a855f7" stroke-width="1.5" stroke-dasharray="2 4" fill="none">
          <animateTransform attributeName="transform" type="rotate" values="360 300 210;0 300 210" dur="10s" repeatCount="indefinite" />
        </circle>
        <g *ngFor="let p of packets; let idx = index" [attr.filter]="'url(#glow)'">
          <circle [attr.cx]="p.cx" [attr.cy]="p.cy" [attr.r]="p.r" [attr.fill]="p.color">
            <animateTransform attributeName="transform" type="rotate" [attr.values]="'0 300 210;360 300 210'" [attr.dur]="p.dur" repeatCount="indefinite" />
          </circle>
        </g>
        <path d="M90 140 Q200 80 300 210" stroke="url(#wire)" stroke-width="2" fill="none" stroke-linecap="round">
          <animate attributeName="stroke-dasharray" values="0 300;150 150;300 0" dur="5s" repeatCount="indefinite" />
        </path>
        <path d="M510 300 Q420 340 300 210" stroke="url(#wire)" stroke-width="2" fill="none" stroke-linecap="round">
          <animate attributeName="stroke-dasharray" values="0 300;150 150;300 0" dur="5s" repeatCount="indefinite" begin="2.5s" />
        </path>
        <g *ngFor="let d of docs" [attr.transform]="'translate('+d.x+','+d.y+')'" opacity="0.9">
          <rect width="72" height="52" rx="10" fill="#ffffff" class="dark:fill-slate-800" stroke="#e2e8f0" stroke-width="1" filter="url(#glow)"></rect>
          <g stroke="#94a3b8" stroke-width="2" stroke-linecap="round" opacity="0.5">
            <line x1="14" y1="16" x2="54" y2="16" />
            <line x1="14" y1="26" x2="46" y2="26" />
            <line x1="14" y1="36" x2="50" y2="36" />
          </g>
          <circle cx="60" cy="14" r="5" fill="#6366f1" />
        </g>
        <g transform="translate(470,130)">
          <rect x="-70" y="-28" width="140" height="78" rx="18" fill="url(#lg1)" stroke="#6366f1" stroke-width="1.5" filter="url(#glow)" />
          <text x="0" y="-4" text-anchor="middle" class="font-medium" fill="#312e81" font-size="14" opacity="0.85">Semantic Match</text>
          <text x="0" y="14" text-anchor="middle" fill="#4338ca" font-size="11" opacity="0.7">Context Ranked</text>
          <text x="0" y="30" text-anchor="middle" fill="#6366f1" font-size="11" opacity="0.7">+ Sources</text>
        </g>
      </svg>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.5),transparent_60%)] dark:bg-[radial-gradient(circle_at_70%_70%,rgba(99,102,241,0.15),transparent_70%)] pointer-events-none"></div>
    </div>
    <div class="mt-5 text-[11px] tracking-wide font-medium flex items-center gap-2 text-slate-600 dark:text-slate-300">
      <span class="inline-flex h-5 w-5 items-center justify-center rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 text-[10px] font-semibold">∞</span>
      Enhance retrieval with adaptive embeddings & intent aware ranking.
    </div>
  </div>
  `,
  styles: [`:host { display: contents; } svg text { font-family: 'Inter', system-ui, sans-serif; }`]
})
export class AuthIllustrationComponent {
  // replicate the arrays from login component for the SVG structure
  gridX = Array.from({ length: 13 }, (_, i) => i * 50);
  gridY = Array.from({ length: 9 }, (_, i) => i * 52.5);
  packets = [
    { cx: 300, cy: 130, r: 6, color: '#6366f1', dur: '18s' },
    { cx: 360, cy: 210, r: 5, color: '#a855f7', dur: '12s' },
    { cx: 300, cy: 290, r: 4, color: '#06b6d4', dur: '16s' },
    { cx: 240, cy: 210, r: 5, color: '#818cf8', dur: '14s' }
  ];
  docs = [
    { x: 70, y: 110 },
    { x: 120, y: 200 },
    { x: 160, y: 60 }
  ];
}
