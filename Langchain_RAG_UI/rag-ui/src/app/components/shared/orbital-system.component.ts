import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orbital-system',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    :host { display: block; }
    :host svg { width: 100%; height: 100%; display: block; }
  `],
  template: `
    <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="orbitalRing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" [attr.stop-color]="ringColors.start" />
          <stop offset="60%" [attr.stop-color]="ringColors.middle" />
          <stop offset="100%" [attr.stop-color]="ringColors.end" />
        </linearGradient>
        
        <!-- Enhanced icon gradients -->
        <linearGradient id="iconGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.9" />
          <stop offset="100%" stop-color="#1D4ED8" stop-opacity="1" />
        </linearGradient>
        <linearGradient id="iconGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#10B981" stop-opacity="0.9" />
          <stop offset="100%" stop-color="#059669" stop-opacity="1" />
        </linearGradient>
        <linearGradient id="iconGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#F59E0B" stop-opacity="0.9" />
          <stop offset="100%" stop-color="#D97706" stop-opacity="1" />
        </linearGradient>
        <linearGradient id="iconGrad4" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#EF4444" stop-opacity="0.9" />
          <stop offset="100%" stop-color="#DC2626" stop-opacity="1" />
        </linearGradient>
        <linearGradient id="iconGrad5" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#8B5CF6" stop-opacity="0.9" />
          <stop offset="100%" stop-color="#7C3AED" stop-opacity="1" />
        </linearGradient>
        <linearGradient id="iconGrad6" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#06B6D4" stop-opacity="0.9" />
          <stop offset="100%" stop-color="#0891B2" stop-opacity="1" />
        </linearGradient>
        
        <!-- Theme-aware shadow filters -->
        <filter id="iconShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="1" stdDeviation="2" flood-color="#000000" flood-opacity="0.25"/>
        </filter>
        <filter id="iconGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <!-- Insert center content via ng-content -->
      <ng-content></ng-content>
      
      <!-- Orbital rings -->
      <circle cx="150" cy="150" r="78" stroke="url(#orbitalRing)" stroke-width="0.8" stroke-dasharray="1 3" opacity="0.3" fill="none">
        <animateTransform attributeName="transform" type="rotate" values="0 150 150;360 150 150" dur="35s" repeatCount="indefinite" />
      </circle>
      <circle cx="150" cy="150" r="85" stroke="url(#orbitalRing)" stroke-width="1" stroke-dasharray="1 5" opacity="0.4" fill="none">
        <animateTransform attributeName="transform" type="rotate" values="360 150 150;0 150 150" dur="22s" repeatCount="indefinite" />
      </circle>
      <circle cx="150" cy="150" r="100" stroke="url(#orbitalRing)" stroke-width="1.5" stroke-dasharray="4 6" fill="none">
        <animateTransform attributeName="transform" type="rotate" values="0 150 150;360 150 150" dur="18s" repeatCount="indefinite" />
      </circle>
      <circle cx="150" cy="150" r="115" stroke="url(#orbitalRing)" stroke-width="1" stroke-dasharray="3 5" opacity="0.6" fill="none">
        <animateTransform attributeName="transform" type="rotate" values="360 150 150;0 150 150" dur="12s" repeatCount="indefinite" />
      </circle>
      <circle cx="150" cy="150" r="125" stroke="url(#orbitalRing)" stroke-width="1" stroke-dasharray="2 8" opacity="0.7" fill="none">
        <animateTransform attributeName="transform" type="rotate" values="360 150 150;0 150 150" dur="15s" repeatCount="indefinite" />
      </circle>
      <circle cx="150" cy="150" r="140" stroke="url(#orbitalRing)" stroke-width="0.8" stroke-dasharray="1 7" opacity="0.5" fill="none">
        <animateTransform attributeName="transform" type="rotate" values="0 150 150;360 150 150" dur="28s" repeatCount="indefinite" />
      </circle>
      <circle cx="150" cy="150" r="155" stroke="url(#orbitalRing)" stroke-width="0.6" stroke-dasharray="1 10" opacity="0.4" fill="none">
        <animateTransform attributeName="transform" type="rotate" values="360 150 150;0 150 150" dur="40s" repeatCount="indefinite" />
      </circle>
      
      <!-- Orbiting icons -->
      <g>
        <!-- Innermost orbit (r=78) -->
        <g opacity="0.8">
          <animateTransform attributeName="transform" type="rotate" values="0 150 150;360 150 150" dur="35s" repeatCount="indefinite" />
          <g transform="translate(150,72)" filter="url(#iconShadow)">
            <!-- Bookmark icon -->
            <path d="M-2,-4 L2,-4 L2,4 L0,2 L-2,4 Z" fill="url(#iconGrad4)" opacity="0.95">
              <animate attributeName="opacity" values="0.8;1;0.8" dur="4s" repeatCount="indefinite" />
            </path>
            <path d="M-1,-3 L1,-3 L1,2.5 L0,1.5 L-1,2.5 Z" fill="#FFFFFF" opacity="0.3" />
          </g>
        </g>
        
        <g opacity="0.8">
          <animateTransform attributeName="transform" type="rotate" values="0 150 150;360 150 150" dur="35s" repeatCount="indefinite" />
          <g transform="translate(228,150)" filter="url(#iconShadow)">
            <!-- File text icon -->
            <rect x="-3" y="-4" width="6" height="8" rx="1" fill="url(#iconGrad1)" opacity="0.95" />
            <line x1="-1" y1="-2" x2="1" y2="-2" stroke="#FFFFFF" stroke-width="0.5" opacity="0.9" />
            <line x1="-1" y1="0" x2="1" y2="0" stroke="#FFFFFF" stroke-width="0.5" opacity="0.9" />
            <line x1="-1" y1="2" x2="1" y2="2" stroke="#FFFFFF" stroke-width="0.5" opacity="0.7" />
            <circle cx="1.5" cy="-3.5" r="0.5" fill="#10B981" opacity="0.8">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
            </circle>
          </g>
        </g>
        
        <!-- Inner orbit (r=85) -->
        <g opacity="0.85">
          <animateTransform attributeName="transform" type="rotate" values="360 150 150;0 150 150" dur="22s" repeatCount="indefinite" />
          <g transform="translate(150,65)" filter="url(#iconGlow)">
            <!-- Tag/Label icon -->
            <path d="M-3,-3 L3,0 L0,3 L-3,0 Z" fill="url(#iconGrad3)" opacity="0.95" />
            <circle cx="-1" cy="-1" r="0.8" fill="#FFFFFF" opacity="0.95" />
            <circle cx="-1" cy="-1" r="0.4" fill="url(#iconGrad3)" opacity="0.6" />
          </g>
        </g>
        
        <g opacity="0.85">
          <animateTransform attributeName="transform" type="rotate" values="360 150 150;0 150 150" dur="22s" repeatCount="indefinite" />
          <g transform="translate(235,150)" filter="url(#iconGlow)">
            <!-- Database/Storage icon -->
            <ellipse cx="0" cy="-2" rx="3" ry="1" fill="url(#iconGrad6)" opacity="0.9" />
            <ellipse cx="0" cy="0" rx="3" ry="1" fill="url(#iconGrad6)" opacity="0.95" />
            <ellipse cx="0" cy="2" rx="3" ry="1" fill="url(#iconGrad6)" opacity="0.9" />
            <path d="M-3,-2 L-3,2 M3,-2 L3,2" stroke="#FFFFFF" stroke-width="0.8" opacity="0.8" />
            <ellipse cx="0" cy="0" rx="2" ry="0.5" fill="#FFFFFF" opacity="0.3" />
          </g>
        </g>
        
        <g opacity="0.85">
          <animateTransform attributeName="transform" type="rotate" values="360 150 150;0 150 150" dur="22s" repeatCount="indefinite" />
          <g transform="translate(65,150)" filter="url(#iconGlow)">
            <!-- Lock/Security icon -->
            <rect x="-2" y="-1" width="4" height="3" rx="0.5" fill="url(#iconGrad4)" opacity="0.95" />
            <path d="M-1,-3 C-1,-4 1,-4 1,-3 L1,-1" stroke="url(#iconGrad4)" stroke-width="1.2" fill="none" opacity="0.9" />
            <circle cx="0" cy="0" r="0.6" fill="#FFFFFF" opacity="0.95" />
            <circle cx="0" cy="0" r="0.3" fill="url(#iconGrad4)" opacity="0.7">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
            </circle>
          </g>
        </g>
        
        <!-- Main orbit (r=100) -->
        <g opacity="0.9">
          <animateTransform attributeName="transform" type="rotate" values="0 150 150;360 150 150" dur="18s" repeatCount="indefinite" />
          <g transform="translate(150,50)" filter="url(#iconShadow)">
            <!-- PDF/Document icon -->
            <rect x="-4" y="-5" width="8" height="10" rx="1" fill="url(#iconGrad4)" opacity="0.95" />
            <path d="M2,-5 L2,-2 L4,-2 Z" fill="#DC2626" opacity="0.8" />
            <line x1="-2" y1="-1" x2="1" y2="-1" stroke="#FFFFFF" stroke-width="0.6" opacity="0.9" />
            <line x1="-2" y1="1" x2="2" y2="1" stroke="#FFFFFF" stroke-width="0.6" opacity="0.9" />
            <line x1="-2" y1="3" x2="1" y2="3" stroke="#FFFFFF" stroke-width="0.6" opacity="0.8" />
            <text x="0" y="0" font-size="2" fill="#FFFFFF" text-anchor="middle" opacity="0.7">PDF</text>
          </g>
        </g>
        
        <g opacity="0.9">
          <animateTransform attributeName="transform" type="rotate" values="0 150 150;360 150 150" dur="18s" repeatCount="indefinite" />
          <g transform="translate(250,150)" filter="url(#iconShadow)">
            <!-- Folder icon -->
            <path d="M-4,-2 L-2,-4 L2,-4 L4,-2 L4,3 L-4,3 Z" fill="url(#iconGrad3)" opacity="0.95" />
            <path d="M-4,-2 L4,-2" stroke="#FFFFFF" stroke-width="0.8" opacity="0.8" />
            <circle cx="0" cy="0" r="1.2" fill="#FFFFFF" opacity="0.4">
              <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="0" cy="0" r="0.6" fill="url(#iconGrad3)" opacity="0.8" />
          </g>
        </g>
        
        <g opacity="0.9">
          <animateTransform attributeName="transform" type="rotate" values="0 150 150;360 150 150" dur="18s" repeatCount="indefinite" />
          <g transform="translate(50,150)" filter="url(#iconShadow)">
            <!-- Spreadsheet icon -->
            <rect x="-4" y="-3" width="8" height="6" rx="1" fill="url(#iconGrad2)" opacity="0.95" />
            <line x1="-4" y1="-1" x2="4" y2="-1" stroke="#FFFFFF" stroke-width="0.6" opacity="0.9" />
            <line x1="-4" y1="1" x2="4" y2="1" stroke="#FFFFFF" stroke-width="0.6" opacity="0.9" />
            <line x1="0" y1="-3" x2="0" y2="3" stroke="#FFFFFF" stroke-width="0.6" opacity="0.9" />
            <circle cx="-2" cy="-2" r="0.3" fill="#FFFFFF" opacity="0.8" />
            <circle cx="2" cy="0" r="0.3" fill="#FFFFFF" opacity="0.8" />
            <circle cx="-2" cy="2" r="0.3" fill="#10B981" opacity="0.9">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
            </circle>
          </g>
        </g>
        
        <g opacity="0.9">
          <animateTransform attributeName="transform" type="rotate" values="0 150 150;360 150 150" dur="18s" repeatCount="indefinite" />
          <g transform="translate(150,250)" filter="url(#iconShadow)">
            <!-- Video file icon -->
            <rect x="-4" y="-3" width="8" height="6" rx="1" fill="url(#iconGrad5)" opacity="0.95" />
            <path d="M-1,-1 L2,0 L-1,1 Z" fill="#FFFFFF" opacity="0.95">
              <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
            </path>
            <circle cx="-2" cy="-2" r="0.4" fill="#EF4444" opacity="0.8">
              <animate attributeName="r" values="0.3;0.5;0.3" dur="1.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="2" cy="-2" r="0.3" fill="#FFFFFF" opacity="0.6" />
          </g>
        </g>
        
        <!-- New orbit (r=115) -->
        <g fill="var(--accent-2)" opacity="0.75">
          <animateTransform attributeName="transform" type="rotate" values="360 150 150;0 150 150" dur="12s" repeatCount="indefinite" />
          <g transform="translate(150,35)">
            <!-- Email icon -->
            <rect x="-4" y="-2" width="8" height="4" rx="1" fill="currentColor" opacity="0.9" />
            <path d="M-4,-2 L0,1 L4,-2" stroke="white" stroke-width="0.8" stroke-linejoin="round" fill="none" opacity="0.8" />
          </g>
        </g>
        
        <g fill="var(--accent-1)" opacity="0.75">
          <animateTransform attributeName="transform" type="rotate" values="360 150 150;0 150 150" dur="12s" repeatCount="indefinite" />
          <g transform="translate(265,150)">
            <!-- Calendar icon -->
            <rect x="-3" y="-3" width="6" height="6" rx="1" fill="currentColor" opacity="0.9" />
            <rect x="-3" y="-3" width="6" height="2" fill="white" opacity="0.8" />
            <line x1="-2" y1="-4" x2="-2" y2="-2" stroke="currentColor" stroke-width="0.8" opacity="0.7" />
            <line x1="2" y1="-4" x2="2" y2="-2" stroke="currentColor" stroke-width="0.8" opacity="0.7" />
            <circle cx="0" cy="1" r="0.8" fill="white" opacity="0.9" />
          </g>
        </g>
        
        <g fill="var(--accent-3)" opacity="0.75">
          <animateTransform attributeName="transform" type="rotate" values="360 150 150;0 150 150" dur="12s" repeatCount="indefinite" />
          <g transform="translate(35,150)">
            <!-- Presentation icon -->
            <rect x="-4" y="-2" width="8" height="4" rx="1" fill="currentColor" opacity="0.9" />
            <rect x="-2" y="-1" width="4" height="2" fill="white" opacity="0.8" />
            <line x1="-1" y1="2" x2="1" y2="4" stroke="currentColor" stroke-width="1" opacity="0.8" />
          </g>
        </g>
        
        <!-- Mid orbit (r=125) -->
        <g fill="var(--accent-3)" opacity="0.9">
          <animateTransform attributeName="transform" type="rotate" values="360 150 150;0 150 150" dur="15s" repeatCount="indefinite" />
          <g transform="translate(150,25)">
            <!-- Search/Magnifying glass icon -->
            <circle cx="0" cy="-1" r="3" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.9" />
            <path d="M2,2 L4,4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.9" />
            <circle cx="0" cy="-1" r="1.5" fill="currentColor" opacity="0.3">
              <animate attributeName="opacity" values="0.1;0.5;0.1" dur="2s" repeatCount="indefinite" />
            </circle>
          </g>
        </g>
        
        <g fill="var(--accent-2)" opacity="0.8">
          <animateTransform attributeName="transform" type="rotate" values="360 150 150;0 150 150" dur="15s" repeatCount="indefinite" />
          <g transform="translate(25,150)">
            <!-- Upload/Cloud icon -->
            <path d="M-3,-1 C-4,-3 -2,-5 0,-5 S4,-3 3,-1 C4,-1 5,0 5,2 C5,3 4,4 3,4 L-3,4 C-4,4 -5,3 -5,2 C-5,0 -4,-1 -3,-1 Z" fill="currentColor" opacity="0.9" />
            <path d="M0,1 L0,-2 M-1,0 L0,-1 L1,0" stroke="white" stroke-width="0.8" stroke-linecap="round" opacity="0.9" fill="none" />
          </g>
        </g>
        
        <g fill="var(--accent-1)" opacity="0.8">
          <animateTransform attributeName="transform" type="rotate" values="360 150 150;0 150 150" dur="15s" repeatCount="indefinite" />
          <g transform="translate(275,150)">
            <!-- Download icon -->
            <rect x="-3" y="-3" width="6" height="6" rx="1" fill="currentColor" opacity="0.3" />
            <path d="M0,-2 L0,2 M-2,0 L0,2 L2,0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.9" fill="none" />
          </g>
        </g>
        
        <!-- Outer orbit (r=140) -->
        <g fill="var(--accent-2)" opacity="0.6">
          <animateTransform attributeName="transform" type="rotate" values="0 150 150;360 150 150" dur="28s" repeatCount="indefinite" />
          <g transform="translate(150,10)">
            <!-- Image/Picture icon -->
            <rect x="-3" y="-3" width="6" height="5" rx="1" fill="currentColor" opacity="0.8" />
            <circle cx="-1" cy="-1" r="0.8" fill="white" opacity="0.9" />
            <path d="M-3,1 L-1,0 L1,-1 L3,1" stroke="white" stroke-width="0.8" stroke-linecap="round" opacity="0.8" fill="none" />
          </g>
        </g>
        
        <g fill="var(--accent-1)" opacity="0.6">
          <animateTransform attributeName="transform" type="rotate" values="0 150 150;360 150 150" dur="28s" repeatCount="indefinite" />
          <g transform="translate(10,150)">
            <!-- Code/Brackets icon -->
            <path d="M-2,-3 L-4,-1 L-4,1 L-2,3 M2,-3 L4,-1 L4,1 L2,3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" opacity="0.8" fill="none">
              <animate attributeName="opacity" values="0.4;0.9;0.4" dur="3s" repeatCount="indefinite" />
            </path>
          </g>
        </g>
        
        <g fill="var(--accent-3)" opacity="0.6">
          <animateTransform attributeName="transform" type="rotate" values="0 150 150;360 150 150" dur="28s" repeatCount="indefinite" />
          <g transform="translate(290,150)">
            <!-- Archive/Zip icon -->
            <rect x="-3" y="-3" width="6" height="6" rx="1" fill="currentColor" opacity="0.8" />
            <path d="M-1,-3 L-1,3 M0,-3 L0,3 M1,-3 L1,3" stroke="white" stroke-width="0.5" opacity="0.7" />
            <circle cx="0" cy="0" r="1" fill="white" opacity="0.5">
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2.5s" repeatCount="indefinite" />
            </circle>
          </g>
        </g>
        
        <g fill="var(--accent-2)" opacity="0.6">
          <animateTransform attributeName="transform" type="rotate" values="0 150 150;360 150 150" dur="28s" repeatCount="indefinite" />
          <g transform="translate(150,290)">
            <!-- Audio file icon -->
            <circle r="3" fill="currentColor" opacity="0.8" />
            <path d="M-1,-2 L-1,2 M1,-1 L1,1" stroke="white" stroke-width="1" opacity="0.9" />
            <circle cx="0" cy="0" r="1" fill="white" opacity="0.4">
              <animate attributeName="r" values="0.8;1.2;0.8" dur="1.5s" repeatCount="indefinite" />
            </circle>
          </g>
        </g>
        
        <!-- Furthest orbit (r=155) -->
        <g fill="var(--accent-1)" opacity="0.5">
          <animateTransform attributeName="transform" type="rotate" values="360 150 150;0 150 150" dur="40s" repeatCount="indefinite" />
          <g transform="translate(150,-5)">
            <!-- Cloud sync icon -->
            <path d="M-3,-1 C-4,-3 -2,-5 0,-5 S4,-3 3,-1 C4,-1 5,0 5,2 C5,3 4,4 3,4 L-3,4 C-4,4 -5,3 -5,2 C-5,0 -4,-1 -3,-1 Z" fill="currentColor" opacity="0.8" />
            <path d="M-1,1 L1,-1 M0,1 L2,-1 M1,1 L3,-1" stroke="white" stroke-width="0.6" opacity="0.8">
              <animate attributeName="opacity" values="0.4;0.9;0.4" dur="3s" repeatCount="indefinite" />
            </path>
          </g>
        </g>
        
        <g fill="var(--accent-3)" opacity="0.5">
          <animateTransform attributeName="transform" type="rotate" values="360 150 150;0 150 150" dur="40s" repeatCount="indefinite" />
          <g transform="translate(-5,150)">
            <!-- Shield/Security icon -->
            <path d="M0,-4 L3,-2 L3,2 C3,3 0,4 0,4 S-3,3 -3,2 L-3,-2 Z" fill="currentColor" opacity="0.8" />
            <path d="M-1,0 L0,1 L2,-1" stroke="white" stroke-width="1" stroke-linecap="round" opacity="0.9" fill="none" />
          </g>
        </g>
        
        <g fill="var(--accent-2)" opacity="0.5">
          <animateTransform attributeName="transform" type="rotate" values="360 150 150;0 150 150" dur="40s" repeatCount="indefinite" />
          <g transform="translate(305,150)">
            <!-- Gear/Settings icon -->
            <circle r="3" fill="currentColor" opacity="0.8" />
            <circle r="1.5" fill="white" opacity="0.9" />
            <path d="M0,-3 L1,-4 L-1,-4 Z M3,0 L4,1 L4,-1 Z M0,3 L-1,4 L1,4 Z M-3,0 L-4,-1 L-4,1 Z" fill="currentColor" opacity="0.6">
              <animate attributeName="opacity" values="0.4;0.8;0.4" dur="4s" repeatCount="indefinite" />
            </path>
          </g>
        </g>
        
        <g fill="var(--accent-1)" opacity="0.5">
          <animateTransform attributeName="transform" type="rotate" values="360 150 150;0 150 150" dur="40s" repeatCount="indefinite" />
          <g transform="translate(155,305)">
            <!-- Star/Favorite icon -->
            <path d="M0,-4 L1,-1 L4,-1 L1.5,1 L2.5,4 L0,2 L-2.5,4 L-1.5,1 L-4,-1 L-1,-1 Z" fill="currentColor" opacity="0.8">
              <animate attributeName="opacity" values="0.3;0.9;0.3" dur="5s" repeatCount="indefinite" />
            </path>
          </g>
        </g>
      </g>
    </svg>
  `,
})
export class OrbitalSystemComponent {
  @Input() ringColors = {
    start: 'var(--accent-2)',
    middle: 'var(--accent-1)',
    end: 'var(--accent-3)'
  };
}