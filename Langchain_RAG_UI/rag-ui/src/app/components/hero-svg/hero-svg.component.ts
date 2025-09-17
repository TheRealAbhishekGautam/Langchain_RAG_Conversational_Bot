import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-svg',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative w-full min-h-[400px]">
      <svg class="w-full h-[400px]" viewBox="0 0 500 400" preserveAspectRatio="xMidYMid meet">
        <!-- Enhanced Background Elements -->
        <defs>
          <!-- Gradients -->
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:var(--primary);stop-opacity:0.15"/>
            <stop offset="50%" style="stop-color:#6366f1;stop-opacity:0.08"/>
            <stop offset="100%" style="stop-color:var(--primary);stop-opacity:0.05"/>
          </linearGradient>
          
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="60%">
            <stop offset="0%" style="stop-color:var(--primary);stop-opacity:0.2"/>
            <stop offset="70%" style="stop-color:var(--primary);stop-opacity:0.05"/>
            <stop offset="100%" style="stop-color:transparent;stop-opacity:0"/>
          </radialGradient>
          
          <linearGradient id="docGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#ffffff"/>
            <stop offset="100%" style="stop-color:#f8fafc"/>
          </linearGradient>
          
          <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:var(--primary)"/>
            <stop offset="50%" style="stop-color:#6366f1"/>
            <stop offset="100%" style="stop-color:#8b5cf6"/>
          </linearGradient>
          
          <linearGradient id="queryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#f1f5f9"/>
            <stop offset="100%" style="stop-color:#e2e8f0"/>
          </linearGradient>
          
          <linearGradient id="answerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:var(--primary)"/>
            <stop offset="100%" style="stop-color:#059669"/>
          </linearGradient>
          
          <!-- Enhanced Filters -->
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="6" stdDeviation="10" flood-opacity="0.15"/>
          </filter>
          
          <filter id="innerShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feOffset dx="0" dy="2"/>
            <feGaussianBlur stdDeviation="2" result="offset-blur"/>
            <feFlood flood-color="#000000" flood-opacity="0.1"/>
            <feComposite in2="offset-blur" operator="in"/>
          </filter>
          
          <!-- Patterns -->
          <pattern id="dotPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="var(--primary)" opacity="0.1"/>
          </pattern>
          
          <pattern id="gridPattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="var(--primary)" stroke-width="0.5" opacity="0.08"/>
          </pattern>
        </defs>
        
        <!-- Multi-layer Background -->
        <rect width="100%" height="100%" fill="url(#bgGradient)" rx="20"/>
        <rect width="100%" height="100%" fill="url(#gridPattern)" rx="20"/>
        <ellipse cx="250" cy="200" rx="200" ry="120" fill="url(#centerGlow)"/>
        
        <!-- Floating Background Elements -->
        <g opacity="0.4">
          <!-- Geometric shapes in background -->
          <circle cx="80" cy="60" r="15" fill="none" stroke="var(--primary)" stroke-width="1" opacity="0.3">
            <animate attributeName="r" values="12;18;12" dur="8s" repeatCount="indefinite"/>
            <animateTransform attributeName="transform" type="rotate" values="0 80 60; 360 80 60" dur="20s" repeatCount="indefinite"/>
          </circle>
          
          <polygon points="420,80 435,100 420,120 405,100" fill="var(--primary)" opacity="0.2">
            <animateTransform attributeName="transform" type="rotate" values="0 420 100; 360 420 100" dur="15s" repeatCount="indefinite"/>
          </polygon>
          
          <rect x="60" y="320" width="20" height="20" rx="3" fill="none" stroke="#6366f1" stroke-width="1" opacity="0.3">
            <animateTransform attributeName="transform" type="rotate" values="0 70 330; 45 70 330; 0 70 330" dur="12s" repeatCount="indefinite"/>
          </rect>
        </g>
        
        <!-- Enhanced Document Stack (Left Side) -->
        <g transform="translate(50, 140)">
          <!-- Document shadow base -->
          <ellipse cx="40" cy="80" rx="50" ry="8" fill="#000000" opacity="0.1">
            <animate attributeName="opacity" values="0.05;0.15;0.05" dur="6s" repeatCount="indefinite"/>
          </ellipse>
          
          <!-- Stack of documents with enhanced stagger effect -->
          <g class="document-stack">
            <!-- Document 4 (furthest back) -->
            <rect x="12" y="24" width="80" height="80" rx="8" fill="url(#docGradient)" 
                  stroke="var(--border)" stroke-width="1" opacity="0.4" filter="url(#dropShadow)">
              <animateTransform attributeName="transform" type="translate" 
                              values="0 0; -3 -3; 0 0" dur="8s" repeatCount="indefinite"/>
            </rect>
            
            <!-- Document 3 (back) -->
            <rect x="8" y="16" width="80" height="80" rx="8" fill="url(#docGradient)" 
                  stroke="var(--border)" stroke-width="1" opacity="0.6" filter="url(#dropShadow)">
              <animateTransform attributeName="transform" type="translate" 
                              values="0 0; -2 -2; 0 0" dur="6s" repeatCount="indefinite"/>
            </rect>
            
            <!-- Document 2 (middle) -->
            <rect x="4" y="8" width="80" height="80" rx="8" fill="url(#docGradient)" 
                  stroke="var(--border)" stroke-width="1" opacity="0.8" filter="url(#dropShadow)">
              <animateTransform attributeName="transform" type="translate" 
                              values="0 0; -1 -1; 0 0" dur="4s" repeatCount="indefinite"/>
            </rect>
            
            <!-- Document 1 (front) -->
            <rect x="0" y="0" width="80" height="80" rx="8" fill="white" 
                  stroke="var(--primary)" stroke-width="2" filter="url(#dropShadow)">
              <animateTransform attributeName="transform" type="translate" 
                              values="0 0; 0 -4; 0 0" dur="3s" repeatCount="indefinite"/>
            </rect>
            
            <!-- Enhanced document content -->
            <g stroke="var(--text-secondary)" stroke-width="1.5" opacity="0.5">
              <line x1="12" y1="15" x2="68" y2="15"/>
              <line x1="12" y1="23" x2="60" y2="23"/>
              <line x1="12" y1="31" x2="65" y2="31"/>
              <line x1="12" y1="39" x2="58" y2="39"/>
              <line x1="12" y1="47" x2="70" y2="47"/>
              <line x1="12" y1="55" x2="55" y2="55"/>
            </g>
            
            <!-- Document icons -->
            <g transform="translate(12, 60)">
              <circle cx="8" cy="8" r="6" fill="#ef4444" opacity="0.1"/>
              <text x="8" y="11" text-anchor="middle" fill="#ef4444" class="text-xs font-bold">📄</text>
            </g>
          </g>
          
          <!-- Upload indicators with background (Perfectly Centered) -->
          <g transform="translate(40, 30)" opacity="0.8">
            <!-- Upload box background -->
            <rect x="-25" y="-8" width="50" height="30" rx="8" fill="url(#answerGradient)" filter="url(#dropShadow)">
              <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite"/>
            </rect>
            
            <!-- Upload arrow with padding -->
            <path d="M0 10 L0 5 M-2 7 L0 5 L2 7" stroke="white" stroke-width="1.5" fill="none">
              <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite"/>
              <animateTransform attributeName="transform" type="translate" values="0 0; 0 -2; 0 0" dur="2s" repeatCount="indefinite"/>
            </path>
            
            <!-- Upload text with padding -->
            <text x="0" y="12" text-anchor="middle" fill="white" class="text-xs font-medium">Upload</text>
          </g>
        </g>
        
        <!-- Enhanced AI Brain/Processor (Perfect Center) -->
        <g transform="translate(250, 200)">
          <!-- Outer energy ring -->
          <circle cx="0" cy="0" r="65" fill="none" stroke="var(--primary)" stroke-width="1" opacity="0.2">
            <animate attributeName="r" values="60;70;60" dur="6s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.1;0.3;0.1" dur="3s" repeatCount="indefinite"/>
          </circle>
          
          <!-- Main AI core with enhanced effects -->
          <circle cx="0" cy="0" r="45" fill="url(#aiGradient)" filter="url(#softGlow)">
            <animate attributeName="r" values="42;48;42" dur="4s" repeatCount="indefinite"/>
          </circle>
          
          <!-- Middle processing ring -->
          <circle cx="0" cy="0" r="35" fill="none" stroke="white" stroke-width="2" opacity="0.4">
            <animate attributeName="stroke-dasharray" values="0 220; 110 110; 0 220" dur="3s" repeatCount="indefinite"/>
            <animateTransform attributeName="transform" type="rotate" values="0; 360" dur="8s" repeatCount="indefinite"/>
          </circle>
          
          <!-- Inner processing ring -->
          <circle cx="0" cy="0" r="25" fill="none" stroke="white" stroke-width="1.5" opacity="0.6">
            <animate attributeName="stroke-dasharray" values="0 157; 78 78; 0 157" dur="2s" repeatCount="indefinite"/>
            <animateTransform attributeName="transform" type="rotate" values="360; 0" dur="5s" repeatCount="indefinite"/>
          </circle>
          
          <!-- Enhanced neural network nodes -->
          <g fill="white" opacity="0.9">
            <circle cx="-20" cy="-20" r="4">
              <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite"/>
              <animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite"/>
            </circle>
            <circle cx="20" cy="-20" r="4">
              <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite" begin="0.3s"/>
              <animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite" begin="0.3s"/>
            </circle>
            <circle cx="-20" cy="20" r="4">
              <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite" begin="0.6s"/>
              <animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite" begin="0.6s"/>
            </circle>
            <circle cx="20" cy="20" r="4">
              <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite" begin="0.9s"/>
              <animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite" begin="0.9s"/>
            </circle>
            
            <!-- Neural connections -->
            <line x1="-20" y1="-20" x2="20" y2="20" stroke="white" stroke-width="1" opacity="0.3">
              <animate attributeName="opacity" values="0.1;0.6;0.1" dur="2s" repeatCount="indefinite"/>
            </line>
            <line x1="20" y1="-20" x2="-20" y2="20" stroke="white" stroke-width="1" opacity="0.3">
              <animate attributeName="opacity" values="0.1;0.6;0.1" dur="2s" repeatCount="indefinite" begin="1s"/>
            </line>
          </g>
          
          <!-- AI symbol with glow -->
          <text x="0" y="8" text-anchor="middle" fill="white" class="text-xl font-bold" filter="url(#softGlow)">AI</text>
          
          <!-- Processing particles around AI -->
          <g fill="white" opacity="0.7">
            <circle cx="0" cy="-50" r="2">
              <animateTransform attributeName="transform" type="rotate" values="0 0 0; 360 0 0" dur="4s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
            </circle>
            <circle cx="35" cy="-35" r="1.5">
              <animateTransform attributeName="transform" type="rotate" values="0 0 0; 360 0 0" dur="6s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" repeatCount="indefinite"/>
            </circle>
            <circle cx="50" cy="0" r="2">
              <animateTransform attributeName="transform" type="rotate" values="0 0 0; 360 0 0" dur="5s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2.5s" repeatCount="indefinite"/>
            </circle>
          </g>
        </g>
        
        <!-- Enhanced Query Input (Top Right) -->
        <g transform="translate(400, 80)">
          <!-- Query glow background -->
          <ellipse cx="0" cy="25" rx="85" ry="40" fill="var(--primary)" opacity="0.1">
            <animate attributeName="opacity" values="0.05;0.15;0.05" dur="4s" repeatCount="indefinite"/>
          </ellipse>
          
          <!-- Main query box with enhanced background -->
          <rect x="-60" y="0" width="120" height="50" rx="20" fill="url(#answerGradient)" 
                stroke="var(--primary)" stroke-width="2" filter="url(#dropShadow)">
            <animate attributeName="stroke-width" values="1.5;2.5;1.5" dur="3s" repeatCount="indefinite"/>
          </rect>
          
          <!-- Query text with proper padding -->
          <text x="0" y="20" text-anchor="middle" fill="white" class="text-xs font-medium">What is the main</text>
          <text x="0" y="35" text-anchor="middle" fill="white" class="text-xs font-medium">conclusion?</text>
          
          <!-- Typing cursor with padding -->
          <rect x="42" y="28" width="1.5" height="10" fill="white">
            <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite"/>
          </rect>
          
          <!-- Question mark icon with padding -->
          <circle cx="50" cy="15" r="8" fill="white" opacity="0.2"/>
          <text x="50" y="19" text-anchor="middle" fill="white" class="text-sm font-bold">?</text>
        </g>
        
        <!-- Enhanced Answer Output (Bottom Right) -->
        <g transform="translate(400, 260)">
          <!-- Answer glow background -->
          <ellipse cx="0" cy="35" rx="85" ry="45" fill="var(--primary)" opacity="0.15">
            <animate attributeName="opacity" values="0.1;0.2;0.1" dur="3s" repeatCount="indefinite" begin="1s"/>
          </ellipse>
          
          <!-- Main answer box with enhanced padding -->
          <rect x="-70" y="0" width="140" height="80" rx="12" fill="url(#answerGradient)" 
                filter="url(#dropShadow)">
            <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" begin="1s"/>
          </rect>
          
          <!-- Answer content with proper padding -->
          <text x="0" y="22" text-anchor="middle" fill="white" class="text-xs font-semibold">Intelligent Answer</text>
          <text x="0" y="38" text-anchor="middle" fill="white" class="text-xs opacity-90">with source citations</text>
          <text x="0" y="52" text-anchor="middle" fill="white" class="text-xs opacity-90">and confidence scores</text>
          
          <!-- Success checkmark with padding -->
          <circle cx="60" cy="18" r="8" fill="white" opacity="0.2"/>
          <text x="60" y="22" text-anchor="middle" fill="white" class="text-sm">✓</text>
          
          <!-- Confidence indicator with padding -->
          <g transform="translate(-55, 62)">
            <rect x="0" y="0" width="90" height="4" rx="2" fill="white" opacity="0.3"/>
            <rect x="0" y="0" width="76" height="4" rx="2" fill="#10b981">
              <animate attributeName="width" values="0;76;76" dur="2s" begin="1.5s" fill="freeze"/>
            </rect>
            <text x="95" y="8" fill="white" class="text-xs font-medium">95%</text>
          </g>
        </g>
        
        <!-- Enhanced Data Flow Arrows with Particles (Symmetric) -->
        <g stroke="var(--primary)" stroke-width="3" fill="none" opacity="0.7">
          <!-- Documents to AI with flowing particles -->
          <path d="M130 180 Q190 190 205 200" id="flow1">
            <animate attributeName="stroke-dasharray" values="0 100; 50 50; 100 0" dur="2s" repeatCount="indefinite"/>
          </path>
          
          <!-- Particles flowing along path 1 -->
          <circle r="3" fill="var(--primary)" opacity="0.8">
            <animateMotion dur="2s" repeatCount="indefinite">
              <mpath href="#flow1"/>
            </animateMotion>
          </circle>
          
          <!-- Query to AI -->
          <path d="M340 105 Q300 150 295 200" id="flow2">
            <animate attributeName="stroke-dasharray" values="0 100; 50 50; 100 0" dur="2s" repeatCount="indefinite" begin="0.5s"/>
          </path>
          
          <!-- Particles flowing along path 2 -->
          <circle r="2.5" fill="#6366f1" opacity="0.8">
            <animateMotion dur="2s" repeatCount="indefinite" begin="0.5s">
              <mpath href="#flow2"/>
            </animateMotion>
          </circle>
          
          <!-- AI to Answer -->
          <path d="M295 200 Q350 220 370 260" id="flow3">
            <animate attributeName="stroke-dasharray" values="0 100; 50 50; 100 0" dur="2s" repeatCount="indefinite" begin="1s"/>
          </path>
          
          <!-- Particles flowing along path 3 -->
          <circle r="3.5" fill="#059669" opacity="0.8">
            <animateMotion dur="2s" repeatCount="indefinite" begin="1s">
              <mpath href="#flow3"/>
            </animateMotion>
          </circle>
        </g>
        
        <!-- Enhanced Processing indicators (Centered) -->
        <g transform="translate(250, 280)">
          <circle cx="-25" cy="0" r="4" fill="var(--primary)" opacity="0.0">
            <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite"/>
            <animate attributeName="r" values="2;6;2" dur="1s" repeatCount="indefinite"/>
          </circle>
          <circle cx="0" cy="0" r="4" fill="var(--primary)" opacity="0.0">
            <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite" begin="0.2s"/>
            <animate attributeName="r" values="2;6;2" dur="1s" repeatCount="indefinite" begin="0.2s"/>
          </circle>
          <circle cx="25" cy="0" r="4" fill="var(--primary)" opacity="0.0">
            <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite" begin="0.4s"/>
            <animate attributeName="r" values="2;6;2" dur="1s" repeatCount="indefinite" begin="0.4s"/>
          </circle>
        </g>
        
        <!-- Enhanced Floating particles for ambiance -->
        <g fill="var(--primary)" opacity="0.4">
          <circle cx="100" cy="50" r="2">
            <animateTransform attributeName="transform" type="translate" 
                            values="0 0; 15 -25; 0 0" dur="10s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.2;0.8;0.2" dur="5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="400" cy="150" r="1.5">
            <animateTransform attributeName="transform" type="translate" 
                            values="0 0; -20 -15; 0 0" dur="8s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.2;0.6;0.2" dur="4s" repeatCount="indefinite"/>
          </circle>
          <circle cx="180" cy="300" r="2.5">
            <animateTransform attributeName="transform" type="translate" 
                            values="0 0; 12 -20; 0 0" dur="9s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.2;0.5;0.2" dur="6s" repeatCount="indefinite"/>
          </circle>
          <circle cx="420" cy="300" r="2">
            <animateTransform attributeName="transform" type="translate" 
                            values="0 0; -10 -15; 0 0" dur="7s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.2;0.7;0.2" dur="3s" repeatCount="indefinite"/>
          </circle>
        </g>
        
        <!-- Data visualization elements -->
        <g transform="translate(400, 180)" opacity="0.3">
          <rect x="0" y="0" width="2" height="15" fill="var(--primary)">
            <animate attributeName="height" values="8;20;8" dur="2s" repeatCount="indefinite"/>
          </rect>
          <rect x="4" y="5" width="2" height="10" fill="var(--primary)">
            <animate attributeName="height" values="5;18;5" dur="2s" repeatCount="indefinite" begin="0.2s"/>
          </rect>
          <rect x="8" y="2" width="2" height="13" fill="var(--primary)">
            <animate attributeName="height" values="10;25;10" dur="2s" repeatCount="indefinite" begin="0.4s"/>
          </rect>
        </g>
      </svg>
    </div>
  `,
  styles: []
})
export class HeroSvgComponent {

}