import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { HeroSvgComponent } from '../../components/hero-svg/hero-svg.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterModule, HeroSvgComponent],
  styles: [`
    .glass {
      background: var(--glass-bg);
      backdrop-filter: blur(10px);
      border: 1px solid var(--border);
    }

    /* Hero Animations */
    @keyframes float-slow {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-10px) rotate(2deg); }
    }

    @keyframes float-delayed {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-8px) rotate(-2deg); }
    }

    @keyframes bounce-gentle {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-5px); }
    }

    .animate-float-slow {
      animation: float-slow 6s ease-in-out infinite;
    }

    .animate-float-delayed {
      animation: float-delayed 7s ease-in-out infinite 2s;
    }

    .animate-bounce-gentle {
      animation: bounce-gentle 3s ease-in-out infinite;
    }

    /* Interactive Elements */
    .hover-lift {
      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    }

    .hover-lift:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    }

    .hover-scale {
      transition: transform 0.2s ease;
    }

    .hover-scale:hover {
      transform: scale(1.05);
    }

    /* Card Styles */
    .card {
      background: var(--card-bg);
      backdrop-filter: blur(10px);
      border: 1px solid var(--border);
      border-radius: 1rem;
      transition: all 0.3s ease;
    }

    .card:hover {
      border-color: var(--primary);
    }

    /* Use global .gradient-animated from styles.scss which is theme-aware */

    /* Animation Delays */
    .fade-in-up {
      opacity: 0;
      transform: translateY(30px);
      animation: fadeInUp 0.8s ease forwards;
    }

    @keyframes fadeInUp {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Pulse Animation for AI Elements */
    @keyframes ai-pulse {
      0%, 100% { 
        box-shadow: 0 0 0 0 rgba(147, 51, 234, 0.7);
        transform: scale(1);
      }
      50% { 
        box-shadow: 0 0 0 10px rgba(147, 51, 234, 0);
        transform: scale(1.05);
      }
    }

    .ai-element {
      animation: ai-pulse 2s infinite;
    }
  `],
  template: `
  <div class="min-h-screen gradient-animated">
    <!-- Global top bar now injected at root; removed duplicate local header -->

    <!-- Hero -->
    <section class="relative overflow-hidden">
      <!-- Background Animated Elements -->
      <div class="absolute inset-0 pointer-events-none">
        <!-- Floating Documents -->
        <svg class="absolute top-20 left-10 opacity-20 animate-float-slow" width="40" height="50" viewBox="0 0 24 30">
          <rect x="2" y="3" width="16" height="20" rx="2" fill="currentColor" class="text-sky-400">
            <animate attributeName="opacity" values="0.2;0.6;0.2" dur="4s" repeatCount="indefinite"/>
          </rect>
          <line x1="5" y1="8" x2="15" y2="8" stroke="currentColor" stroke-width="0.5" class="text-blue-300"/>
          <line x1="5" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="0.5" class="text-blue-300"/>
          <line x1="5" y1="14" x2="16" y2="14" stroke="currentColor" stroke-width="0.5" class="text-blue-300"/>
        </svg>
        
        <svg class="absolute top-32 right-16 opacity-15 animate-float-delayed" width="35" height="45" viewBox="0 0 24 30">
          <rect x="2" y="3" width="16" height="20" rx="2" fill="currentColor" class="text-indigo-400">
            <animate attributeName="opacity" values="0.15;0.5;0.15" dur="5s" repeatCount="indefinite"/>
          </rect>
          <circle cx="6" cy="8" r="1" fill="currentColor" class="text-indigo-200"/>
          <circle cx="6" cy="12" r="1" fill="currentColor" class="text-indigo-200"/>
          <circle cx="6" cy="16" r="1" fill="currentColor" class="text-indigo-200"/>
        </svg>

        <!-- AI Nodes Network -->
        <svg class="absolute bottom-20 left-20 opacity-25" width="120" height="80" viewBox="0 0 120 80">
          <g class="animate-pulse">
            <circle cx="20" cy="20" r="3" fill="currentColor" class="text-cyan-400">
              <animate attributeName="r" values="2;4;2" dur="2s" repeatCount="indefinite"/>
            </circle>
            <circle cx="60" cy="40" r="2" fill="currentColor" class="text-sky-300">
              <animate attributeName="r" values="1;3;1" dur="3s" repeatCount="indefinite"/>
            </circle>
            <circle cx="100" cy="25" r="2.5" fill="currentColor" class="text-blue-400">
              <animate attributeName="r" values="1.5;3.5;1.5" dur="2.5s" repeatCount="indefinite"/>
            </circle>
            <!-- Connecting Lines -->
            <line x1="20" y1="20" x2="60" y2="40" stroke="currentColor" stroke-width="1" class="text-cyan-300" opacity="0.4">
              <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2s" repeatCount="indefinite"/>
            </line>
            <line x1="60" y1="40" x2="100" y2="25" stroke="currentColor" stroke-width="1" class="text-sky-300" opacity="0.3">
              <animate attributeName="opacity" values="0.1;0.5;0.1" dur="2.5s" repeatCount="indefinite"/>
            </line>
          </g>
        </svg>
      </div>

      <!-- Enhanced Full-Width Hero Layout -->
      <div class="w-full py-16 sm:py-20 relative">
        <div class="max-w-7xl mx-auto px-4">
          <!-- Main Content Area -->
          <div class="grid lg:grid-cols-2 gap-12 items-center">
            <!-- Left Side - Text Content -->
            <div class="text-center lg:text-left">
              <h1 class="relative inline-block text-5xl sm:text-6xl font-extrabold leading-tight tracking-tight mb-8">
                <span class="bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent">Chat with</span>
                <span class="text-theme ml-3">Your Documents</span>
                <span class="block text-theme mt-4 text-3xl sm:text-4xl font-bold">Using AI</span>
                <span class="absolute -bottom-4 left-1/2 lg:left-0 -translate-x-1/2 lg:translate-x-0 w-48 h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent"></span>
              </h1>
              <p class="mt-5 text-lg sm:text-xl text-theme-secondary/90 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Ingest PDFs, Word docs and text sources. Ask questions and receive cited, trustworthy answers grounded in your own content.
              </p>
              <div class="mt-8 flex flex-wrap justify-center lg:justify-start gap-4">
                <a routerLink="/register" class="btn btn-primary text-base sm:text-lg px-8 py-3 hover-scale">Create free account</a>
                <a routerLink="/login" class="btn btn-outline text-base sm:text-lg px-8 py-3 hover-scale">Sign in</a>
              </div>
              <!-- Mini Feature Badges -->
              <!-- <div class="mt-8 flex flex-wrap justify-center lg:justify-start gap-4 text-sm">
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="14" rx="1"/><rect x="14" y="4" width="7" height="14" rx="1"/><path d="M7 8h.01M7 12h.01M7 16h.01M17 8h.01M17 12h.01M17 16h.01"/></svg>
                  <span class="text-theme-secondary">Multi-format</span>
                </div>
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1"/></svg>
                  <span class="text-theme-secondary">Precise answers</span>
                </div>
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h6l-2 8 10-12h-6l2-8Z"/></svg>
                  <span class="text-theme-secondary">Fast retrieval</span>
                </div>
              </div> -->
            </div>

            <!-- Right Side - Hero Illustration -->
            <div class="flex justify-center lg:justify-end">
              <app-hero-svg></app-hero-svg>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="w-full py-5 relative">
      <div class="max-w-7xl mx-auto px-4">
        <!-- Section Header -->
        <div class="text-center mb-12">
          <h2 class="relative inline-block text-4xl sm:text-5xl font-bold leading-tight">
            <span class="bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent">How</span>
            <span class="text-theme ml-3">It Works</span>
            <span class="absolute -bottom-3 left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent"></span>
          </h2>
          <p class="mt-8 text-xl text-theme-secondary max-w-3xl mx-auto">
            Our advanced RAG (Retrieval-Augmented Generation) system processes your documents and delivers precise answers
          </p>
        </div>

        <!-- Enhanced RAG AI Workflow Visualization -->
        <div class="relative glass rounded-2xl p-8 border border-theme">
          <div class="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-indigo-600/5 rounded-2xl"></div>
          
          <!-- SVG Workflow Diagram -->
          <div class="relative">
            <svg class="w-full h-[500px] text-theme-secondary" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid meet">
                <!-- Background Grid -->
                <defs>
                  <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.1"/>
                  </pattern>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" class="text-sky-400"/>
                  </marker>
                  <!-- Background ribbon gradient -->
                  <linearGradient id="bg-ribbon-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="currentColor" stop-opacity="0.3"/>
                    <stop offset="100%" stop-color="currentColor" stop-opacity="0.0"/>
                  </linearGradient>
                  <!-- Soft blur filter for glows -->
                  <filter id="soft-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="10"/>
                  </filter>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)"/>

                <!-- Decorative background to fill whitespace -->
                <g aria-hidden="true" opacity="0.55">
                  <!-- Diagonal ribbon -->
                  <g fill="url(#bg-ribbon-gradient)" opacity="0.08">
                    <path d="M -50 430 C 200 360, 400 360, 650 430 S 1050 500, 1150 430"/>
                    <path d="M -50 455 C 200 385, 400 385, 650 455 S 1050 525, 1150 455"/>
                  </g>

                  <!-- Concentric rings (subtle) -->
                  <g stroke="currentColor" stroke-width="1" opacity="0.08" class="text-indigo-400">
                    <circle cx="120" cy="90" r="55">
                      <animate attributeName="r" values="50;60;50" dur="9s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="880" cy="380" r="65" class="text-sky-400">
                      <animate attributeName="r" values="60;72;60" dur="11s" repeatCount="indefinite"/>
                    </circle>
                  </g>

                  <!-- Gentle particle field -->
                  <g>
                    <circle cx="70" cy="300" r="1.6" fill="currentColor" class="text-cyan-300" opacity="0.35">
                      <animate attributeName="cy" values="300;290;300" dur="6s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="930" cy="120" r="1.2" fill="currentColor" class="text-emerald-300" opacity="0.35">
                      <animate attributeName="cy" values="120;110;120" dur="7s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="480" cy="470" r="1.4" fill="currentColor" class="text-purple-300" opacity="0.3">
                      <animate attributeName="cy" values="470;455;470" dur="8s" repeatCount="indefinite"/>
                    </circle>
                  </g>

                  <!-- Soft glows behind each box -->
                  <g filter="url(#soft-glow)">
                    <circle cx="120" cy="90" r="38" fill="var(--primary)" opacity="0.06"/>
                    <circle cx="350" cy="180" r="45" fill="var(--primary)" opacity="0.06"/>
                    <circle cx="730" cy="90" r="42" fill="var(--primary)" opacity="0.06"/>
                    <circle cx="650" cy="330" r="48" fill="var(--primary)" opacity="0.06"/>
                    <circle cx="930" cy="400" r="50" fill="var(--primary)" opacity="0.06"/>
                  </g>
                </g>

                <!-- Document Upload (Top-Left) -->
                <g class="document-upload" transform="translate(-80, 40)">
                  <rect x="50" y="0" width="200" height="120" rx="15" fill="var(--bg)" stroke="currentColor" stroke-width="2" class="text-sky-500" opacity="0.2">
                    <animate attributeName="opacity" values="0.1;0.3;0.1" dur="3s" repeatCount="indefinite"/>
                  </rect>
                  <text x="150" y="25" text-anchor="middle" fill="currentColor" class="text-sm font-semibold text-theme">Document Upload</text>
                  
                  <!-- Enhanced Upload Animation -->
                  <g class="upload-animation">
                    <!-- Floating document icons above arrows -->
                    <g class="floating-docs">
                      <rect x="115" y="40" width="10" height="12" rx="1" fill="currentColor" class="text-red-400" opacity="0.7">
                        <animate attributeName="opacity" values="0.4;0.9;0.4" dur="3s" repeatCount="indefinite"/>
                        <animateTransform attributeName="transform" type="translate" values="0 3; 0 -2; 0 3" dur="3s" repeatCount="indefinite"/>
                      </rect>
                      <rect x="145" y="42" width="10" height="12" rx="1" fill="currentColor" class="text-blue-400" opacity="0.6">
                        <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3.5s" repeatCount="indefinite"/>
                        <animateTransform attributeName="transform" type="translate" values="0 2; 0 -3; 0 2" dur="3.5s" repeatCount="indefinite"/>
                      </rect>
                      <rect x="175" y="38" width="10" height="12" rx="1" fill="currentColor" class="text-green-400" opacity="0.8">
                        <animate attributeName="opacity" values="0.5;1;0.5" dur="2.8s" repeatCount="indefinite"/>
                        <animateTransform attributeName="transform" type="translate" values="0 4; 0 -1; 0 4" dur="2.8s" repeatCount="indefinite"/>
                      </rect>
                    </g>
                    
                    <!-- Original upload arrows with enhanced effects -->
                    <path d="M120 55 L120 75 M115 60 L120 55 L125 60" stroke="currentColor" class="text-sky-400" stroke-width="2" fill="none" stroke-linecap="round">
                      <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
                      <animateTransform attributeName="transform" type="translate" values="0 5; 0 0; 0 5" dur="2s" repeatCount="indefinite"/>
                    </path>
                    <path d="M150 55 L150 75 M145 60 L150 55 L155 60" stroke="currentColor" class="text-sky-400" stroke-width="2" fill="none" stroke-linecap="round">
                      <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" begin="0.5s"/>
                      <animateTransform attributeName="transform" type="translate" values="0 5; 0 0; 0 5" dur="2s" repeatCount="indefinite" begin="0.5s"/>
                    </path>
                    <path d="M180 55 L180 75 M175 60 L180 55 L185 60" stroke="currentColor" class="text-sky-400" stroke-width="2" fill="none" stroke-linecap="round">
                      <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" begin="1s"/>
                      <animateTransform attributeName="transform" type="translate" values="0 5; 0 0; 0 5" dur="2s" repeatCount="indefinite" begin="1s"/>
                    </path>
                    
                    <!-- Small processing particles -->
                    <g class="upload-particles">
                      <circle cx="120" cy="85" r="1" fill="currentColor" class="text-yellow-400" opacity="0.6">
                        <animate attributeName="opacity" values="0.3;0.9;0.3" dur="2.5s" repeatCount="indefinite"/>
                        <animate attributeName="r" values="0.5;1.5;0.5" dur="2.5s" repeatCount="indefinite"/>
                      </circle>
                      <circle cx="150" cy="87" r="1.2" fill="currentColor" class="text-orange-400" opacity="0.7">
                        <animate attributeName="opacity" values="0.4;1;0.4" dur="2.2s" repeatCount="indefinite"/>
                        <animate attributeName="r" values="0.8;1.8;0.8" dur="2.2s" repeatCount="indefinite"/>
                      </circle>
                      <circle cx="180" cy="86" r="0.8" fill="currentColor" class="text-cyan-400" opacity="0.5">
                        <animate attributeName="opacity" values="0.2;0.8;0.2" dur="2.8s" repeatCount="indefinite"/>
                        <animate attributeName="r" values="0.4;1.2;0.4" dur="2.8s" repeatCount="indefinite"/>
                      </circle>
                    </g>
                  </g>

                  <text x="150" y="105" text-anchor="middle" fill="currentColor" class="text-xs opacity-70 text-theme-muted">Processing documents...</text>
                  
                  <!-- File Types -->
                  <g class="file-types" transform="translate(80, 140)">
                    <rect x="0" y="0" width="35" height="25" rx="4" fill="currentColor" class="text-red-400" opacity="0.7"/>
                    <text x="17" y="17" text-anchor="middle" fill="#fff" class="text-xs font-bold">PDF</text>
                    
                    <rect x="45" y="0" width="35" height="25" rx="4" fill="currentColor" class="text-blue-400" opacity="0.7"/>
                    <text x="62" y="17" text-anchor="middle" fill="#fff" class="text-xs font-bold">DOCX</text>
                    
                    <rect x="90" y="0" width="35" height="25" rx="4" fill="currentColor" class="text-green-400" opacity="0.7"/>
                    <text x="107" y="17" text-anchor="middle" fill="#fff" class="text-xs font-bold">TXT</text>
                  </g>
                </g>

                <!-- Vector Processing (Center-Left) -->
                <g class="vector-processing" transform="translate(200, 200)">
                  <rect x="50" y="-40" width="200" height="120" rx="15" fill="var(--bg)" stroke="currentColor" stroke-width="2" class="text-indigo-500" opacity="0.2">
                    <animate attributeName="opacity" values="0.1;0.3;0.1" dur="4s" repeatCount="indefinite"/>
                  </rect>
                  <text x="150" y="-15" text-anchor="middle" fill="currentColor" class="text-sm font-semibold text-theme">Vector Processing</text>
                  
                  <!-- Simplified Vector visualization -->
                  <g class="vectors" transform="translate(85, 0)">
                    <!-- Input text chunks -->
                    <g class="input-chunks">
                      <rect x="10" y="5" width="20" height="8" rx="2" fill="currentColor" class="text-blue-400" opacity="0.7">
                        <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite"/>
                      </rect>
                      <rect x="10" y="18" width="20" height="8" rx="2" fill="currentColor" class="text-blue-400" opacity="0.6">
                        <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2.8s" repeatCount="indefinite"/>
                      </rect>
                      <rect x="10" y="31" width="20" height="8" rx="2" fill="currentColor" class="text-blue-400" opacity="0.8">
                        <animate attributeName="opacity" values="0.6;1;0.6" dur="2.2s" repeatCount="indefinite"/>
                      </rect>
                    </g>
                    
                    <!-- Processing arrows -->
                    <g class="processing-flow" stroke="currentColor" class="text-indigo-400" stroke-width="1.5" fill="none">
                      <path d="M35 9 L60 9 M55 6 L60 9 L55 12">
                        <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite"/>
                      </path>
                      <path d="M35 22 L60 22 M55 19 L60 22 L55 25">
                        <animate attributeName="opacity" values="0.4;1;0.4" dur="2.3s" repeatCount="indefinite"/>
                      </path>
                      <path d="M35 35 L60 35 M55 32 L60 35 L55 38">
                        <animate attributeName="opacity" values="0.4;1;0.4" dur="2.7s" repeatCount="indefinite"/>
                      </path>
                    </g>
                    
                    <!-- Vector embeddings output -->
                    <g class="vector-output">
                      <rect x="70" y="12" width="40" height="6" rx="3" fill="currentColor" class="text-purple-500" opacity="0.8">
                        <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite"/>
                        <animate attributeName="width" values="35;45;35" dur="3s" repeatCount="indefinite"/>
                      </rect>
                      <rect x="70" y="22" width="40" height="6" rx="3" fill="currentColor" class="text-violet-500" opacity="0.7">
                        <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2.5s" repeatCount="indefinite"/>
                        <animate attributeName="width" values="38;42;38" dur="2.5s" repeatCount="indefinite"/>
                      </rect>
                      <rect x="70" y="32" width="40" height="6" rx="3" fill="currentColor" class="text-indigo-500" opacity="0.9">
                        <animate attributeName="opacity" values="0.7;1;0.7" dur="2.8s" repeatCount="indefinite"/>
                        <animate attributeName="width" values="36;44;36" dur="2.8s" repeatCount="indefinite"/>
                      </rect>
                    </g>
                    
                    <!-- Small processing indicator -->
                    <circle cx="50" cy="22" r="3" fill="currentColor" class="text-emerald-400" opacity="0.6">
                      <animate attributeName="r" values="2;4;2" dur="2s" repeatCount="indefinite"/>
                      <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite"/>
                    </circle>
                  </g>
                  
                  <text x="150" y="65" text-anchor="middle" fill="currentColor" class="text-xs opacity-70 text-theme-muted">Creating embeddings...</text>
                </g>

                <!-- Query Processing (Top-Right) -->
                <g class="query-processing" transform="translate(580, 80)">
                  <rect x="50" y="-40" width="200" height="120" rx="15" fill="var(--bg)" stroke="currentColor" stroke-width="2" class="text-emerald-500" opacity="0.2">
                    <animate attributeName="opacity" values="0.1;0.3;0.1" dur="3.5s" repeatCount="indefinite"/>
                  </rect>
                  <text x="150" y="-10" text-anchor="middle" fill="currentColor" class="text-sm font-semibold text-theme">Query Processing</text>
                  
                  <!-- User Question -->
                  <rect x="70" y="10" width="160" height="40" rx="20" fill="var(--primary)" opacity="0.8">
                    <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite"/>
                  </rect>
                  <text x="150" y="28" text-anchor="middle" fill="#fff" class="text-xs">What are the key findings</text>
                  <text x="150" y="39" text-anchor="middle" fill="#fff" class="text-xs">in the research paper?</text>
                  
                  <!-- Query Vectorization -->
                  <g class="query-vectors" transform="translate(120, 65)">
                    <circle cx="0" cy="0" r="2" fill="currentColor" class="text-emerald-400" opacity="0.7">
                      <animate attributeName="r" values="1;3;1" dur="2.5s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="20" cy="5" r="1.5" fill="currentColor" class="text-teal-400" opacity="0.6">
                      <animate attributeName="r" values="0.5;2.5;0.5" dur="3s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="40" cy="10" r="2.5" fill="currentColor" class="text-green-400" opacity="0.8">
                      <animate attributeName="r" values="1.5;3.5;1.5" dur="2.2s" repeatCount="indefinite"/>
                    </circle>
                  </g>
                </g>

                <!-- Similarity Search (Center) -->
                <g class="similarity-search" transform="translate(500, 340)">
                  <rect x="50" y="-40" width="200" height="120" rx="15" fill="var(--bg)" stroke="currentColor" stroke-width="2" class="text-orange-500" opacity="0.2">
                    <animate attributeName="opacity" values="0.1;0.3;0.1" dur="3.2s" repeatCount="indefinite"/>
                  </rect>
                  <text x="150" y="-15" text-anchor="middle" fill="currentColor" class="text-sm font-semibold text-theme">Similarity Search</text>
                  
                  <!-- Search visualization -->
                  <g class="search-viz" transform="translate(150, 25)">
                    <circle cx="0" cy="0" r="18" fill="none" stroke="currentColor" stroke-width="2" class="text-orange-400" opacity="0.5">
                      <animate attributeName="r" values="15;22;15" dur="3s" repeatCount="indefinite"/>
                      <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="0" cy="0" r="4" fill="currentColor" class="text-orange-500"/>
                    
                    <!-- Relevant documents found -->
                    <g class="found-docs">
                      <rect x="-6" y="-25" width="12" height="12" rx="2" fill="currentColor" class="text-yellow-400" opacity="0.8">
                        <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
                      </rect>
                      <rect x="15" y="-8" width="12" height="12" rx="2" fill="currentColor" class="text-yellow-400" opacity="0.7">
                        <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2.5s" repeatCount="indefinite"/>
                      </rect>
                      <rect x="-22" y="10" width="12" height="12" rx="2" fill="currentColor" class="text-yellow-400" opacity="0.6">
                        <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite"/>
                      </rect>
                    </g>
                  </g>
                  
                  <text x="150" y="65" text-anchor="middle" fill="currentColor" class="text-xs opacity-70 text-theme-muted">Finding relevant content...</text>
                </g>

                <!-- Answer Generation (Bottom-Right) -->
                <g class="answer-generation" transform="translate(800, 410)">
                  <rect x="50" y="-40" width="200" height="120" rx="15" fill="var(--bg)" stroke="currentColor" stroke-width="2" class="text-purple-500" opacity="0.2">
                    <animate attributeName="opacity" values="0.1;0.3;0.1" dur="4.5s" repeatCount="indefinite"/>
                  </rect>
                  <text x="150" y="-15" text-anchor="middle" fill="currentColor" class="text-sm font-semibold text-theme">Answer Generation</text>
                  
                  <!-- Generated answer -->
                  <rect x="70" y="-2" width="160" height="55" rx="10" fill="var(--primary)" opacity="0.9">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="4s" repeatCount="indefinite"/>
                  </rect>
                  <text x="150" y="18" text-anchor="middle" fill="#fff" class="text-xs">Based on the analysis of</text>
                  <text x="150" y="29" text-anchor="middle" fill="#fff" class="text-xs">3 relevant documents,</text>
                  <text x="150" y="41" text-anchor="middle" fill="#fff" class="text-xs">the key findings are...</text>
                  
                  <text x="150" y="70" text-anchor="middle" fill="currentColor" class="text-xs opacity-70 text-theme-muted">Generating response...</text>
                </g>

                <!-- Enhanced Data Flow with Particles (Hero Style) -->
                <g class="data-flow" stroke-width="3" fill="none" opacity="0.8">
                  <!-- Upload to Vector Processing -->
                  <path d="M170 100 Q210 130 250 180" id="workflowPath1" stroke="var(--primary)" stroke-width="4" opacity="0.3">
                    <animate attributeName="stroke-dasharray" values="0 100; 50 50; 100 0" dur="3s" repeatCount="indefinite"/>
                  </path>
                  <path d="M170 100 Q210 130 250 180" stroke="#0ea5e9" stroke-width="2">
                    <animate attributeName="stroke-dasharray" values="0 80; 40 40; 80 0" dur="2.5s" repeatCount="indefinite"/>
                  </path>
                  
                  <!-- Flowing particles for path 1 -->
                  <circle r="4" fill="#0ea5e9" opacity="0.9">
                    <animateMotion dur="3s" repeatCount="indefinite">
                      <mpath href="#workflowPath1"/>
                    </animateMotion>
                    <animate attributeName="r" values="3;5;3" dur="1s" repeatCount="indefinite"/>
                  </circle>
                  <circle r="2.5" fill="#38bdf8" opacity="0.7">
                    <animateMotion dur="3s" repeatCount="indefinite" begin="1s">
                      <mpath href="#workflowPath1"/>
                    </animateMotion>
                  </circle>
                  
                  <!-- Query to Similarity Search -->
                  <path d="M680 160 Q640 220 650 300" id="workflowPath2" stroke="var(--primary)" stroke-width="4" opacity="0.3">
                    <animate attributeName="stroke-dasharray" values="0 120; 60 60; 120 0" dur="3.5s" repeatCount="indefinite" begin="0.5s"/>
                  </path>
                  <path d="M680 160 Q640 220 650 300" stroke="#10b981" stroke-width="2">
                    <animate attributeName="stroke-dasharray" values="0 100; 50 50; 100 0" dur="3s" repeatCount="indefinite" begin="1s"/>
                  </path>
                  
                  <!-- Flowing particles for path 2 -->
                  <circle r="3.5" fill="#10b981" opacity="0.9">
                    <animateMotion dur="3.5s" repeatCount="indefinite" begin="0.5s">
                      <mpath href="#workflowPath2"/>
                    </animateMotion>
                    <animate attributeName="r" values="2.5;4.5;2.5" dur="1.2s" repeatCount="indefinite"/>
                  </circle>
                  <circle r="2" fill="#34d399" opacity="0.6">
                    <animateMotion dur="3.5s" repeatCount="indefinite" begin="1.5s">
                      <mpath href="#workflowPath2"/>
                    </animateMotion>
                  </circle>
                  
                  <!-- Vector Processing to Similarity Search -->
                  <path d="M400 280 Q470 310 550 340" id="workflowPath3" stroke="var(--primary)" stroke-width="4" opacity="0.3">
                    <animate attributeName="stroke-dasharray" values="0 90; 45 45; 90 0" dur="2.8s" repeatCount="indefinite" begin="0.3s"/>
                  </path>
                  <path d="M400 280 Q470 310 550 340" stroke="#6366f1" stroke-width="2">
                    <animate attributeName="stroke-dasharray" values="0 80; 40 40; 80 0" dur="2.5s" repeatCount="indefinite" begin="0.8s"/>
                  </path>
                  
                  <!-- Flowing particles for path 3 -->
                  <circle r="3" fill="#6366f1" opacity="0.8">
                    <animateMotion dur="2.8s" repeatCount="indefinite" begin="0.3s">
                      <mpath href="#workflowPath3"/>
                    </animateMotion>
                    <animate attributeName="r" values="2;4;2" dur="1.1s" repeatCount="indefinite"/>
                  </circle>
                  <circle r="2.2" fill="#8b5cf6" opacity="0.6">
                    <animateMotion dur="2.8s" repeatCount="indefinite" begin="1.3s">
                      <mpath href="#workflowPath3"/>
                    </animateMotion>
                  </circle>
                  
                  <!-- Similarity Search to Answer Generation -->
                  <path d="M750 380 Q800 380 850 410" id="workflowPath4" stroke="var(--primary)" stroke-width="4" opacity="0.3">
                    <animate attributeName="stroke-dasharray" values="0 100; 50 50; 100 0" dur="3.2s" repeatCount="indefinite" begin="1.5s"/>
                  </path>
                  <path d="M750 380 Q800 380 850 410" stroke="#f59e0b" stroke-width="2">
                    <animate attributeName="stroke-dasharray" values="0 90; 45 45; 90 0" dur="2.8s" repeatCount="indefinite" begin="2s"/>
                  </path>
                  
                  <!-- Flowing particles for path 4 -->
                  <circle r="4.5" fill="#f59e0b" opacity="0.9">
                    <animateMotion dur="3.2s" repeatCount="indefinite" begin="1.5s">
                      <mpath href="#workflowPath4"/>
                    </animateMotion>
                    <animate attributeName="r" values="3.5;5.5;3.5" dur="1.3s" repeatCount="indefinite"/>
                  </circle>
                  <circle r="2.8" fill="#fbbf24" opacity="0.7">
                    <animateMotion dur="3.2s" repeatCount="indefinite" begin="2.5s">
                      <mpath href="#workflowPath4"/>
                    </animateMotion>
                  </circle>
                </g>
                
                <!-- Multi-layer Background Enhancement -->
                <g class="background-layers" opacity="0.4">
                  <!-- Floating Data Particles -->
                  <g fill="var(--primary)" opacity="0.3">
                    <circle cx="150" cy="80" r="3">
                      <animate attributeName="cy" values="80;60;80" dur="6s" repeatCount="indefinite"/>
                      <animate attributeName="opacity" values="0.2;0.6;0.2" dur="4s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="400" cy="150" r="2.5">
                      <animate attributeName="cx" values="400;420;400" dur="5s" repeatCount="indefinite"/>
                      <animate attributeName="opacity" values="0.1;0.5;0.1" dur="3s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="550" cy="120" r="2">
                      <animate attributeName="r" values="1.5;3;1.5" dur="4s" repeatCount="indefinite"/>
                      <animate attributeName="opacity" values="0.2;0.7;0.2" dur="5s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="180" cy="350" r="3.5">
                      <animate attributeName="cy" values="350;330;350" dur="7s" repeatCount="indefinite"/>
                      <animate attributeName="opacity" values="0.3;0.8;0.3" dur="6s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="650" cy="280" r="2.2">
                      <animate attributeName="cx" values="650;670;650" dur="8s" repeatCount="indefinite"/>
                      <animate attributeName="r" values="1.8;2.8;1.8" dur="3.5s" repeatCount="indefinite"/>
                    </circle>
                  </g>
                  
                  <!-- Connecting Energy Lines -->
                  <g stroke="var(--primary)" stroke-width="1" fill="none" opacity="0.2">
                    <line x1="100" y1="100" x2="200" y2="150">
                      <animate attributeName="opacity" values="0.1;0.4;0.1" dur="4s" repeatCount="indefinite"/>
                    </line>
                    <line x1="500" y1="80" x2="600" y2="120">
                      <animate attributeName="opacity" values="0.1;0.3;0.1" dur="5s" repeatCount="indefinite" begin="1s"/>
                    </line>
                    <line x1="300" y1="350" x2="450" y2="380">
                      <animate attributeName="opacity" values="0.1;0.5;0.1" dur="6s" repeatCount="indefinite" begin="2s"/>
                    </line>
                  </g>
                  
                  <!-- Processing Indicators -->
                  <g transform="translate(500, 200)">
                    <circle cx="-30" cy="0" r="3" fill="#0ea5e9" opacity="0.0">
                      <animate attributeName="opacity" values="0;0.8;0" dur="1.5s" repeatCount="indefinite"/>
                      <animate attributeName="r" values="2;5;2" dur="1.5s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="0" cy="0" r="3" fill="#10b981" opacity="0.0">
                      <animate attributeName="opacity" values="0;0.8;0" dur="1.5s" repeatCount="indefinite" begin="0.3s"/>
                      <animate attributeName="r" values="2;5;2" dur="1.5s" repeatCount="indefinite" begin="0.3s"/>
                    </circle>
                    <circle cx="30" cy="0" r="3" fill="#6366f1" opacity="0.0">
                      <animate attributeName="opacity" values="0;0.8;0" dur="1.5s" repeatCount="indefinite" begin="0.6s"/>
                      <animate attributeName="r" values="2;5;2" dur="1.5s" repeatCount="indefinite" begin="0.6s"/>
                    </circle>
                  </g>
                </g>
            </svg>
          </div>
          
          <!-- Process Steps Description -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            <div class="text-center">
              <div class="w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-white font-bold">1</span>
              </div>
              <h3 class="font-semibold text-theme mb-2">Upload Documents</h3>
              <p class="text-sm opacity-70 text-theme-muted">Upload your PDFs, DOCX files, and other documents to our secure platform.</p>
            </div>
            
            <div class="text-center">
              <div class="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-white font-bold">2</span>
              </div>
              <h3 class="font-semibold text-theme mb-2">Process & Vectorize</h3>
              <p class="text-sm opacity-70 text-theme-muted">AI breaks down your documents into semantic chunks and creates vector embeddings.</p>
            </div>
            
            <div class="text-center">
              <div class="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-white font-bold">3</span>
              </div>
              <h3 class="font-semibold text-theme mb-2">Smart Search</h3>
              <p class="text-sm opacity-70 text-theme-muted">Your questions are matched with the most relevant document sections using similarity search.</p>
            </div>
            
            <div class="text-center">
              <div class="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-white font-bold">4</span>
              </div>
              <h3 class="font-semibold text-theme mb-2">Generate Answer</h3>
              <p class="text-sm opacity-70 text-theme-muted">AI generates accurate answers with proper citations from your documents.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
  <section id="features" class="py-14 md:py-12 bg-gradient-to-br from-theme-bg to-theme-bg/50">
  <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="relative inline-block text-4xl md:text-5xl font-bold leading-tight">
            <span class="bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent">Powerful</span>
            <span class="text-theme ml-3">Features</span>
            <span class="absolute -bottom-3 left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent"></span>
          </h2>
          <p class="mt-8 max-w-2xl mx-auto text-base md:text-lg text-theme-secondary/90 leading-relaxed">
            Everything you need to transform raw documents into searchable, trustworthy answers—built with performance,
            security, and clarity at its core.
          </p>
        </div>
        
        <div class="grid lg:grid-cols-3 gap-8">
          <!-- Multi-Format Support -->
          <div class="card p-8 hover-lift group relative overflow-hidden">
            <div class="w-16 h-16 bg-gradient-to-br from-sky-400 to-sky-600 text-white rounded-2xl flex items-center justify-center mb-6 ai-element">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
                <path d="M14 2v6h6" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
                <path d="M8 13h8M8 17h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-theme">Multi-Format Support</h3>
            <div class="h-0.5 w-12 bg-white/10 rounded mb-4"></div>
            <p class="opacity-80 text-theme-secondary">Upload PDFs, Word documents, and text files. Our AI understands the structure and content of your documents.</p>
          </div>
          
          <!-- Precise Answers -->
          <div class="card p-8 hover-lift group relative overflow-hidden">
            <div class="w-16 h-16 bg-gradient-to-br from-indigo-400 to-indigo-600 text-white rounded-2xl flex items-center justify-center mb-6 ai-element">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.8"/>
                <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.8"/>
                <circle cx="12" cy="12" r="1.8" fill="currentColor"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-theme">Precise Answers</h3>
            <div class="h-0.5 w-12 bg-white/10 rounded mb-4"></div>
            <p class="opacity-80 text-theme-secondary">Get accurate, contextual answers grounded in your documents with exact source citations and page references.</p>
          </div>
          
          <!-- Lightning Fast -->
          <div class="card p-8 hover-lift group relative overflow-hidden">
            <div class="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 text-white rounded-2xl flex items-center justify-center mb-6 ai-element">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M13 2 3 14h6l-2 8 10-12h-6l2-8Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-theme">Lightning Fast</h3>
            <div class="h-0.5 w-12 bg-white/10 rounded mb-4"></div>
            <p class="opacity-80 text-theme-secondary">Advanced vector search and caching provide instant responses to your questions across large document collections.</p>
          </div>
          
          <!-- Secure & Private -->
          <div class="card p-8 hover-lift group relative overflow-hidden">
            <div class="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 text-white rounded-2xl flex items-center justify-center mb-6 ai-element">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" stroke-width="1.8"/>
                <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-theme">Secure & Private</h3>
            <div class="h-0.5 w-12 bg-white/10 rounded mb-4"></div>
            <p class="opacity-80 text-theme-secondary">Enterprise-grade security ensures your documents remain private. Full GDPR compliance and data encryption.</p>
          </div>
          
          <!-- Transparent Pricing (replaces Team Collaboration) -->
          <div class="card p-8 hover-lift group relative overflow-hidden">
            <div class="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 text-white rounded-2xl flex items-center justify-center mb-6 ai-element">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M6 9 13 2l9 9-7 7-9-9Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
                <circle cx="12" cy="6" r="1.6" fill="currentColor"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-theme">Transparent Pricing</h3>
            <div class="h-0.5 w-12 bg-white/10 rounded mb-4"></div>
            <p class="opacity-80 text-theme-secondary">Clear, value‑first plans with no hidden fees. Start free and upgrade only when you grow.</p>
          </div>
          
          <!-- Smart Analytics -->
          <div class="card p-8 hover-lift group relative overflow-hidden">
            <div class="w-16 h-16 bg-gradient-to-br from-rose-400 to-rose-600 text-white rounded-2xl flex items-center justify-center mb-6 ai-element">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M6 18V10M12 18V7M18 18V13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-theme">Smart Analytics</h3>
            <div class="h-0.5 w-12 bg-white/10 rounded mb-4"></div>
            <p class="opacity-80 text-theme-secondary">Track usage patterns, popular queries, and document insights to optimize your knowledge management.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="py-20 gradient-animated">
  <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="relative inline-block text-4xl md:text-5xl font-bold leading-tight">
            <span class="bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent">What Our</span>
            <span class="text-theme ml-3">Users Say</span>
            <span class="absolute -bottom-3 left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent"></span>
          </h2>
          <p class="mt-8 max-w-2xl mx-auto text-base md:text-lg text-theme-secondary/90 leading-relaxed">Real teams and builders using the platform to accelerate knowledge discovery and decision making.</p>
        </div>
        
        <div class="grid lg:grid-cols-3 gap-8">
          <div *ngFor="let testimonial of testimonials" class="card p-8 hover-lift">
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-indigo-600 flex items-center justify-center text-white text-xl">
                {{ testimonial.avatar }}
              </div>
              <div class="ml-4">
                <h4 class="font-semibold text-theme">{{ testimonial.name }}</h4>
                <p class="text-sm opacity-70 text-theme-muted">{{ testimonial.role }}, {{ testimonial.company }}</p>
              </div>
            </div>
            <p class="italic text-theme-secondary">"{{ testimonial.content }}"</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing -->
    <section id="pricing" class="py-20 bg-gradient-to-br from-theme-bg to-theme-bg/50">
  <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="relative inline-block text-4xl md:text-5xl font-bold leading-tight">
            <span class="bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent">Simple</span>
            <span class="text-theme ml-3">Pricing</span>
            <span class="absolute -bottom-3 left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent"></span>
          </h2>
          <p class="mt-8 max-w-2xl mx-auto text-base md:text-lg text-theme-secondary/90 leading-relaxed">Clear, scalable plans—start free, upgrade only when the value is undeniable.</p>
        </div>
        
        <div class="grid lg:grid-cols-3 gap-8">
          <div class="card p-8 hover-lift relative">
            <div class="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-indigo-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            <div class="relative">
              <h3 class="text-lg font-semibold text-theme">Starter</h3>
              <p class="text-sm opacity-70 text-theme-muted">For individuals</p>
              <p class="mt-4 text-3xl font-bold text-theme">Free</p>
              <ul class="mt-4 space-y-2 text-sm opacity-80 text-theme-muted">
                <li>• 5 documents</li>
                <li>• 50 questions/month</li>
                <li>• Basic support</li>
              </ul>
              <a routerLink="/register" class="btn btn-outline mt-6 w-full justify-center hover-scale">Get started</a>
            </div>
          </div>
          
          <div class="card p-8 hover-lift relative border-2 border-indigo-500">
            <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span class="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium px-4 py-1 rounded-full">Popular</span>
            </div>
            <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            <div class="relative">
              <h3 class="text-lg font-semibold text-theme">Pro</h3>
              <p class="text-sm opacity-70 text-theme-muted">For professionals</p>
              <p class="mt-4 text-3xl font-bold text-theme">$19<span class="text-base font-medium opacity-70">/mo</span></p>
              <ul class="mt-4 space-y-2 text-sm opacity-80 text-theme-muted">
                <li>• 100 documents</li>
                <li>• Unlimited questions</li>
                <li>• Priority support</li>
              </ul>
              <a routerLink="/register" class="btn btn-primary mt-6 w-full justify-center hover-scale">Choose Pro</a>
            </div>
          </div>
          
          <div class="card p-8 hover-lift relative">
            <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            <div class="relative">
              <h3 class="text-lg font-semibold text-theme">Team</h3>
              <p class="text-sm opacity-70 text-theme-muted">For organizations</p>
              <p class="mt-4 text-3xl font-bold text-theme">$29<span class="text-base font-medium opacity-70">/mo</span></p>
              <ul class="mt-4 space-y-2 text-sm opacity-80 text-theme-muted">
                <li>• Unlimited documents</li>
                <li>• Unlimited questions</li>
                <li>• 24/7 support</li>
              </ul>
              <a routerLink="/register" class="btn btn-outline mt-6 w-full justify-center hover-scale">Contact Sales</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="relative bg-theme/75 backdrop-blur-sm">
      <div class="max-w-7xl mx-auto px-4 py-10">
        <div class="grid gap-12 lg:grid-cols-5">
          <!-- Brand / Summary -->
          <div class="lg:col-span-2 space-y-5">
            <div class="flex items-center gap-3">
              <span class="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-sky-500 via-indigo-500 to-purple-600 text-white shadow ring-1 ring-white/10">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2l3.5 7H22l-5.5 4 2 8L12 17l-6.5 4 2-8L2 9h6.5L12 2z" fill="currentColor"/></svg>
              </span>
              <div class="flex flex-col -space-y-0.5">
                <span class="font-semibold tracking-tight bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Ask The Document</span>
                <span class="text-[11px] uppercase tracking-wider text-theme-secondary/60">Conversational RAG</span>
              </div>
            </div>
            <p class="text-sm leading-relaxed text-theme-secondary/80 max-w-sm">Transform static knowledge into interactive answers. Upload, query, and trust every response with source-backed transparency.</p>
            <div class="flex items-center gap-4 pt-2">
              <a href="https://github.com" target="_blank" rel="noopener" aria-label="GitHub" class="text-theme-secondary/60 hover:text-theme transition-colors">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="none"><path fill="currentColor" d="M12 2C6.48 2 2 6.58 2 12.17c0 4.47 2.87 8.26 6.84 9.61.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05 .9 1.56 2.36 1.11 2.94.85.09-.67.35-1.11.63-1.37-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.31.1-2.74 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0 1 12 6.8c.85.01 1.71.12 2.51.35 1.9-1.32 2.74-1.05 2.74-1.05 .55 1.43.2 2.48.1 2.74a3.9 3.9 0 0 1 1.03 2.76c0 3.94-2.34 4.8-4.57 5.05 .36.32.67.94.67 1.9 0 1.37-.01 2.47-.01 2.81 0 .26.18.58.69.48A10.2 10.2 0 0 0 22 12.17C22 6.58 17.52 2 12 2Z"/></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener" aria-label="LinkedIn" class="text-theme-secondary/60 hover:text-theme transition-colors">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M8.34 17V10.74H6V17H8.34M7.17 9.63A1.37 1.37 0 0 0 8.5 8.25A1.37 1.37 0 0 0 7.17 6.88A1.37 1.37 0 0 0 5.84 8.25A1.37 1.37 0 0 0 7.17 9.63M18 17V13.66C18 11.89 17.62 10.6 15.56 10.6C14.56 10.6 13.86 11.16 13.57 11.69H13.53V10.74H11.34V17H13.66V14.04C13.66 13.14 13.83 12.27 14.94 12.27C16.03 12.27 16.05 13.29 16.05 14.1V17H18Z"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener" aria-label="Twitter" class="text-theme-secondary/60 hover:text-theme transition-colors">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M22 5.92c-.77.35-1.6.57-2.46.67a4.3 4.3 0 0 0 1.88-2.38 8.59 8.59 0 0 1-2.72 1.05 4.28 4.28 0 0 0-7.4 2.92c0 .33.04.66.11.97A12.13 12.13 0 0 1 3.16 4.9a4.27 4.27 0 0 0-.58 2.15 4.28 4.28 0 0 0 1.9 3.56 4.25 4.25 0 0 1-1.94-.53v.05a4.29 4.29 0 0 0 3.44 4.2 4.3 4.3 0 0 1-1.93.07 4.29 4.29 0 0 0 4 2.98A8.6 8.6 0 0 1 2 19.54a12.14 12.14 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.39-.01-.58A8.7 8.7 0 0 0 22 5.92Z"/></svg>
              </a>
            </div>
          </div>
          <!-- Links: Features -->
          <div class="space-y-4">
            <h4 class="text-sm font-semibold tracking-wide text-theme">Features</h4>
            <ul class="space-y-2 text-sm text-theme-secondary/70">
              <li><a href="#features" class="hover:text-theme transition-colors">Multi-format ingest</a></li>
              <li><a href="#features" class="hover:text-theme transition-colors">Semantic search</a></li>
              <li><a href="#features" class="hover:text-theme transition-colors">Cited answers</a></li>
              <li><a href="#features" class="hover:text-theme transition-colors">Analytics</a></li>
            </ul>
          </div>
          <!-- Links: Resources -->
          <div class="space-y-4">
            <h4 class="text-sm font-semibold tracking-wide text-theme">Resources</h4>
            <ul class="space-y-2 text-sm text-theme-secondary/70">
              <li><a href="#pricing" class="hover:text-theme transition-colors">Pricing</a></li>
              <li><a href="#" class="hover:text-theme transition-colors">Documentation</a></li>
              <li><a href="#" class="hover:text-theme transition-colors">API (coming)</a></li>
              <li><a href="#" class="hover:text-theme transition-colors">Changelog</a></li>
            </ul>
          </div>
          <!-- Links: Support -->
          <div class="space-y-4">
            <h4 class="text-sm font-semibold tracking-wide text-theme">Support</h4>
            <ul class="space-y-2 text-sm text-theme-secondary/70">
              <li><a href="#" class="hover:text-theme transition-colors">Help center</a></li>
              <li><a href="#" class="hover:text-theme transition-colors">Status</a></li>
              <li><a href="#" class="hover:text-theme transition-colors">Security</a></li>
              <li><a href="#" class="hover:text-theme transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
  <div class="mt-14 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-theme-secondary/60">
          <p>© {{year}} Ask The Document. All rights reserved.</p>
          <div class="flex items-center gap-6">
            <a href="#" class="hover:text-theme transition-colors">Privacy</a>
            <a href="#" class="hover:text-theme transition-colors">Terms</a>
            <a href="#" class="hover:text-theme transition-colors">Cookie</a>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class HomePageComponent { 
  year = new Date().getFullYear(); 
  expandedFaq = -1;
  
  testimonials = [
    { name: 'Sarah Chen', role: 'Research Director', company: 'TechCorp', content: 'RAG AI has transformed how we analyze research papers. Getting precise answers with citations saves us hours every day.', avatar: '👩‍💼' },
    { name: 'Marcus Rodriguez', role: 'Legal Analyst', company: 'LawFirm Pro', content: 'The ability to upload case documents and get instant, source-backed answers is game-changing for our legal research.', avatar: '👨‍💼' },
    { name: 'Dr. Emily Watson', role: 'Medical Researcher', company: 'HealthTech Inc', content: 'Fast, accurate document analysis with proper citations. This tool is now essential to our research workflow.', avatar: '👩‍⚕️' }
  ];

  faqs = [
    { q: 'What file types are supported?', a: 'We currently support PDF and DOCX documents. More formats like PowerPoint and Excel are coming soon.' },
    { q: 'How accurate are the AI responses?', a: 'Our RAG system provides highly accurate answers by grounding responses in your actual documents, with citations for verification.' },
    { q: 'Is my data secure?', a: 'Yes, all documents are processed securely on our servers with enterprise-grade encryption. Your data is never shared.' },
    { q: 'Can I use this for my team?', a: 'Absolutely! Our Pro and Team plans support collaboration with shared workspaces and role-based access.' },
    { q: 'What happens to my documents?', a: 'Documents are stored securely and can be deleted anytime. We use them only to answer your questions.' }
  ];

  constructor(public theme: ThemeService, private auth: AuthService, private router: Router) {
    // Redirect authenticated users to conversation page
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/conversation']);
    }
  }
  
  toggleTheme(){ this.theme.toggle(); }
  
  toggleFaq(index: number) {
    this.expandedFaq = this.expandedFaq === index ? -1 : index;
  }
}