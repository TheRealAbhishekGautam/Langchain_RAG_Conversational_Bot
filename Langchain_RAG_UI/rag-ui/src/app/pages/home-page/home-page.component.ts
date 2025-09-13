import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
    <!-- Nav -->
    <header class="sticky top-0 z-20 border-b border-theme bg-theme/80 backdrop-blur">
      <div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <span class="inline-flex items-center justify-center w-9 h-9 rounded-md bg-gradient-to-br from-sky-500 to-indigo-600">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2l3.5 7H22l-5.5 4 2 8L12 17l-6.5 4 2-8L2 9h6.5L12 2z" fill="currentColor"/></svg>
          </span>
          <span class="font-semibold tracking-tight text-theme">RAG Conversational AI</span>
        </div>
        <nav class="hidden sm:flex items-center gap-6 text-sm opacity-80 text-theme-secondary">
          <a routerLink="/" class="hover:opacity-100 transition-opacity">Home</a>
          <a href="#features" class="hover:opacity-100 transition-opacity">Features</a>
          <a href="#pricing" class="hover:opacity-100 transition-opacity">Pricing</a>
        </nav>
        <div class="flex items-center gap-2">
          <button class="btn btn-outline text-xs" (click)="toggleTheme()">{{ theme.theme()==='dark' ? 'Light mode' : 'Dark mode' }}</button>
          <a routerLink="/login" class="btn btn-outline text-xs">Sign in</a>
          <a routerLink="/register" class="btn btn-primary text-xs">Get started</a>
        </div>
      </div>
    </header>

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
      <div class="w-full px-4 py-16 sm:py-20 relative">
        <div class="max-w-7xl mx-auto">
          <!-- Main Content Area -->
          <div class="text-center mb-12">
            <h1 class="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 mx-auto max-w-5xl">
              <span class="bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                Chat with your documents
              </span>
              <br>
              <span class="text-theme">using AI</span>
            </h1>
            <p class="text-xl sm:text-2xl text-theme-secondary max-w-3xl mx-auto mb-8">
              Upload multiple PDFs and DOCX files and get precise, grounded answers with citations from your content.
            </p>
            <div class="flex flex-wrap justify-center gap-4 mb-8">
              <a routerLink="/register" class="btn btn-primary text-lg px-8 py-3 hover-scale">Create free account</a>
              <a routerLink="/login" class="btn btn-outline text-lg px-8 py-3 hover-scale">Sign in</a>
            </div>
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
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)"/>

                <!-- Document Upload (Top-Left) -->
                <g class="document-upload" transform="translate(50, 60)">
                  <rect x="50" y="0" width="200" height="120" rx="15" fill="var(--bg)" stroke="currentColor" stroke-width="2" class="text-sky-500" opacity="0.2">
                    <animate attributeName="opacity" values="0.1;0.3;0.1" dur="3s" repeatCount="indefinite"/>
                  </rect>
                  <text x="150" y="40" text-anchor="middle" fill="currentColor" class="text-sm font-semibold text-theme">📄 Document Upload</text>
                  
                  <!-- Upload Animation -->
                  <g class="upload-animation">
                    <path d="M120 70 L120 90 M115 75 L120 70 L125 75" stroke="currentColor" class="text-sky-400" stroke-width="2" fill="none" stroke-linecap="round">
                      <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
                      <animateTransform attributeName="transform" type="translate" values="0 5; 0 0; 0 5" dur="2s" repeatCount="indefinite"/>
                    </path>
                    <path d="M150 70 L150 90 M145 75 L150 70 L155 75" stroke="currentColor" class="text-sky-400" stroke-width="2" fill="none" stroke-linecap="round">
                      <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" begin="0.5s"/>
                      <animateTransform attributeName="transform" type="translate" values="0 5; 0 0; 0 5" dur="2s" repeatCount="indefinite" begin="0.5s"/>
                    </path>
                    <path d="M180 70 L180 90 M175 75 L180 70 L185 75" stroke="currentColor" class="text-sky-400" stroke-width="2" fill="none" stroke-linecap="round">
                      <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" begin="1s"/>
                      <animateTransform attributeName="transform" type="translate" values="0 5; 0 0; 0 5" dur="2s" repeatCount="indefinite" begin="1s"/>
                    </path>
                  </g>

                  <text x="150" y="245" text-anchor="middle" fill="currentColor" class="text-xs opacity-70 text-theme-muted">Processing documents...</text>
                  
                  <!-- File Types -->
                  <g class="file-types" transform="translate(80, 280)">
                    <rect x="0" y="0" width="35" height="45" rx="4" fill="currentColor" class="text-red-400" opacity="0.7"/>
                    <text x="17" y="30" text-anchor="middle" fill="#fff" class="text-xs font-bold">PDF</text>
                    
                    <rect x="45" y="0" width="35" height="45" rx="4" fill="currentColor" class="text-blue-400" opacity="0.7"/>
                    <text x="62" y="25" text-anchor="middle" fill="#fff" class="text-xs font-bold">DOC</text>
                    <text x="62" y="35" text-anchor="middle" fill="#fff" class="text-xs font-bold">X</text>
                    
                    <rect x="90" y="0" width="35" height="45" rx="4" fill="currentColor" class="text-green-400" opacity="0.7"/>
                    <text x="107" y="30" text-anchor="middle" fill="#fff" class="text-xs font-bold">TXT</text>
                  </g>
                </g>

                <!-- Vector Processing (Center-Left) -->
                <g class="vector-processing" transform="translate(280, 180)">
                  <rect x="50" y="-40" width="200" height="120" rx="15" fill="var(--bg)" stroke="currentColor" stroke-width="2" class="text-indigo-500" opacity="0.2">
                    <animate attributeName="opacity" values="0.1;0.3;0.1" dur="4s" repeatCount="indefinite"/>
                  </rect>
                  <text x="150" y="-0" text-anchor="middle" fill="currentColor" class="text-sm font-semibold text-theme">🧠 Vector Processing</text>
                  
                  <!-- Vector visualization -->
                  <g class="vectors" transform="translate(80, 20)">
                    <g class="vector-grid">
                      <circle cx="20" cy="0" r="3" fill="currentColor" class="text-purple-400" opacity="0.8">
                        <animate attributeName="r" values="2;4;2" dur="3s" repeatCount="indefinite"/>
                      </circle>
                      <circle cx="60" cy="10" r="2.5" fill="currentColor" class="text-pink-400" opacity="0.7">
                        <animate attributeName="r" values="1.5;3.5;1.5" dur="3.5s" repeatCount="indefinite"/>
                      </circle>
                      <circle cx="100" cy="5" r="3.5" fill="currentColor" class="text-indigo-400" opacity="0.9">
                        <animate attributeName="r" values="2.5;4.5;2.5" dur="2.8s" repeatCount="indefinite"/>
                      </circle>
                      <circle cx="140" cy="15" r="2" fill="currentColor" class="text-violet-400" opacity="0.6">
                        <animate attributeName="r" values="1;3;1" dur="4s" repeatCount="indefinite"/>
                      </circle>
                    </g>
                  </g>
                </g>

                <!-- Query Processing (Top-Right) -->
                <g class="query-processing" transform="translate(520, 80)">
                  <rect x="50" y="-40" width="200" height="120" rx="15" fill="var(--bg)" stroke="currentColor" stroke-width="2" class="text-emerald-500" opacity="0.2">
                    <animate attributeName="opacity" values="0.1;0.3;0.1" dur="3.5s" repeatCount="indefinite"/>
                  </rect>
                  <text x="150" y="0" text-anchor="middle" fill="currentColor" class="text-sm font-semibold text-theme">❓ Query Processing</text>
                  
                  <!-- User Question -->
                  <rect x="70" y="40" width="160" height="60" rx="30" fill="var(--primary)" opacity="0.8">
                    <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite"/>
                  </rect>
                  <text x="150" y="65" text-anchor="middle" fill="#fff" class="text-xs">What are the key findings</text>
                  <text x="150" y="80" text-anchor="middle" fill="#fff" class="text-xs">in the research paper?</text>
                  
                  <!-- Query Vectorization -->
                  <path d="M150 110 L150 130" stroke="currentColor" class="text-sky-400" stroke-width="2" fill="none" marker-end="url(#arrowhead)">
                    <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
                  </path>
                  
                  <text x="150" y="160" text-anchor="middle" fill="currentColor" class="text-xs font-semibold text-theme">Vector Similarity Search</text>
                  
                  <!-- Search Animation -->
                  <g class="search-animation" transform="translate(80, 170)">
                    <circle cx="30" cy="10" r="8" fill="none" stroke="currentColor" class="text-emerald-400" stroke-width="2">
                      <animate attributeName="r" values="6;12;6" dur="2s" repeatCount="indefinite"/>
                      <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/>
                    </circle>
                    <path d="M36 16 L44 24" stroke="currentColor" class="text-emerald-400" stroke-width="2" stroke-linecap="round">
                      <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/>
                    </path>
                  </g>
                  
                  <text x="150" y="245" text-anchor="middle" fill="currentColor" class="text-xs opacity-70 text-theme-muted">Assembling context...</text>
                  
                  <!-- Context Assembly -->
                  <g class="context-assembly" transform="translate(100, 260)">
                    <rect x="0" y="0" width="100" height="40" rx="8" fill="currentColor" class="text-emerald-500" opacity="0.3">
                      <animate attributeName="opacity" values="0.2;0.5;0.2" dur="3s" repeatCount="indefinite"/>
                    </rect>
                    <text x="50" y="25" text-anchor="middle" fill="currentColor" class="text-xs font-semibold text-theme">🤖 AI Response</text>
                  </g>
                </g>

                <!-- Citations & Sources (Right) -->
                <g class="citations-sources" transform="translate(780, 180)">
                  <rect x="50" y="-40" width="200" height="160" rx="15" fill="var(--bg)" stroke="currentColor" stroke-width="2" class="text-amber-500" opacity="0.2">
                    <animate attributeName="opacity" values="0.1;0.3;0.1" dur="4.5s" repeatCount="indefinite"/>
                  </rect>
                  <text x="150" y="0" text-anchor="middle" fill="currentColor" class="text-sm font-semibold text-theme">📎 Citations & Sources</text>
                  
                  <!-- Citation Cards -->
                  <g class="citation-cards" transform="translate(70, 20)">
                    <g class="citation-1">
                      <rect x="0" y="0" width="160" height="25" rx="4" fill="currentColor" class="text-amber-400" opacity="0.2"/>
                      <text x="10" y="20" fill="currentColor" class="text-xs text-theme">📄 Research_Paper.pdf - Page 23</text>
                    </g>
                    
                    <g class="citation-2" transform="translate(0, 35)">
                      <rect x="0" y="0" width="160" height="25" rx="4" fill="currentColor" class="text-orange-400" opacity="0.2"/>
                      <text x="10" y="20" fill="currentColor" class="text-xs text-theme">📊 Data_Analysis.docx - Section 4</text>
                    </g>
                    
                    <g class="citation-3" transform="translate(0, 70)">
                      <rect x="0" y="0" width="160" height="25" rx="4" fill="currentColor" class="text-yellow-400" opacity="0.2"/>
                      <text x="10" y="20" fill="currentColor" class="text-xs text-theme">📈 Results_Summary.pdf - Figure 7</text>
                    </g>
                    
                    <!-- Confidence Scores -->
                    <g class="confidence-scores" transform="translate(0, 105)">
                      <text x="0" y="15" fill="currentColor" class="text-xs opacity-70 text-theme-muted">Confidence Scores:</text>
                      
                      <!-- Score 1 -->
                      <rect x="0" y="20" width="96" height="8" rx="4" fill="currentColor" class="text-green-400" opacity="0.3"/>
                      <text x="125" y="32" fill="currentColor" class="text-xs text-theme">96%</text>
                      
                      <!-- Score 2 -->
                      <rect x="0" y="35" width="84" height="8" rx="4" fill="currentColor" class="text-yellow-400" opacity="0.3"/>
                      <text x="125" y="47" fill="currentColor" class="text-xs text-theme">84%</text>
                      
                      <!-- Score 3 -->
                      <rect x="0" y="50" width="78" height="8" rx="4" fill="currentColor" class="text-orange-400" opacity="0.3"/>
                      <text x="125" y="62" fill="currentColor" class="text-xs text-theme">78%</text>
                    </g>
                  </g>
                </g>

                <!-- Connecting Arrows with Animation -->
                <!-- Upload to Vector Processing -->
                <path d="M250 180 L330 200" stroke="currentColor" class="text-sky-400" stroke-width="3" fill="none" marker-end="url(#arrowhead)" opacity="0.7">
                  <animate attributeName="opacity" values="0.4;0.9;0.4" dur="3s" repeatCount="indefinite"/>
                </path>
                
                <!-- Vector to Query -->
                <path d="M480 200 L570 140" stroke="currentColor" class="text-indigo-400" stroke-width="3" fill="none" marker-end="url(#arrowhead)" opacity="0.7">
                  <animate attributeName="opacity" values="0.4;0.9;0.4" dur="3s" repeatCount="indefinite" begin="1s"/>
                </path>
                
                <!-- Query to Citations -->
                <path d="M720 200 L830 200" stroke="currentColor" class="text-emerald-400" stroke-width="3" fill="none" marker-end="url(#arrowhead)" opacity="0.7">
                  <animate attributeName="opacity" values="0.4;0.9;0.4" dur="3s" repeatCount="indefinite" begin="2s"/>
                </path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Enhanced Features Section -->
    <section id="features" class="w-full py-20 relative overflow-hidden">
      <!-- Background Elements -->
  <div class="absolute inset-0 bg-gradient-to-br from-[color-mix(in_oklab,var(--primary),transparent_90%)] to-[color-mix(in_oklab,#6366f1,transparent_90%)]"></div>
      
      <div class="max-w-7xl mx-auto px-4 relative z-10">
        <div class="text-center mb-16">
          <h2 class="text-4xl sm:text-5xl font-bold mb-6">
            <span class="bg-gradient-to-r from-sky-500 to-indigo-600 bg-clip-text text-transparent">
              Powerful AI Features
            </span>
          </h2>
          <p class="text-xl opacity-80 max-w-3xl mx-auto text-theme-muted">
            Experience the future of document interaction with our comprehensive RAG AI platform
          </p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          <div class="group relative">
            <div class="card p-8 hover-lift fade-in-up h-full relative overflow-hidden">
              <!-- Background glow effect -->
              <div class="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div class="relative z-10">
                <div class="text-sky-400 mb-6 flex justify-center">
                    <svg width="64" height="64" viewBox="0 0 32 32" fill="none" class="hover:scale-110 transition-transform duration-300">
                      <!-- Animated Document Stack -->
                      <rect x="6" y="8" width="16" height="20" rx="2" fill="currentColor" opacity="0.3">
                        <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite"/>
                      </rect>
                      <rect x="8" y="6" width="16" height="20" rx="2" fill="currentColor" opacity="0.6">
                        <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" begin="0.5s"/>
                      </rect>
                      <rect x="10" y="4" width="16" height="20" rx="2" fill="currentColor">
                        <animate attributeName="opacity" values="1;0.8;1" dur="2s" repeatCount="indefinite" begin="1s"/>
                      </rect>
                      <!-- Document Lines -->
                      <line x1="13" y1="9" x2="22" y2="9" stroke="white" stroke-width="0.5" opacity="0.6"/>
                      <line x1="13" y1="12" x2="20" y2="12" stroke="white" stroke-width="0.5" opacity="0.6"/>
                      <line x1="13" y1="15" x2="23" y2="15" stroke="white" stroke-width="0.5" opacity="0.6"/>
                      <!-- Upload Arrow -->
                      <path d="M16 28 L16 24 M14 26 L16 24 L18 26" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.8">
                        <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite"/>
                        <animateTransform attributeName="transform" type="translate" values="0 0; 0 -2; 0 0" dur="1.5s" repeatCount="indefinite"/>
                      </path>
                    </svg>
                  </div>
                  <h3 class="text-xl font-bold mb-3 text-center text-theme">Upload Multiple Documents</h3>
                  <p class="text-center opacity-80 leading-relaxed text-theme-muted">Add PDFs and Word files to build your knowledge base. We handle chunking and indexing automatically.</p>
                </div>
              </div>
            </div>

            <div class="group relative">
            <div class="card p-8 hover-lift fade-in-up h-full relative overflow-hidden">
              <!-- Background glow effect -->
              <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div class="relative z-10">
                <div class="text-emerald-400 mb-6 flex justify-center">
                  <svg width="64" height="64" viewBox="0 0 32 32" fill="none" class="hover:scale-110 transition-transform duration-300">
                    <!-- Brain with Neural Network -->
                    <ellipse cx="16" cy="14" rx="10" ry="8" fill="currentColor" opacity="0.2">
                      <animate attributeName="opacity" values="0.2;0.4;0.2" dur="3s" repeatCount="indefinite"/>
                    </ellipse>
                    <!-- Neural connections -->
                    <g opacity="0.7">
                      <circle cx="12" cy="10" r="1.5" fill="currentColor">
                        <animate attributeName="r" values="1;2;1" dur="2s" repeatCount="indefinite"/>
                      </circle>
                      <circle cx="20" cy="12" r="1.5" fill="currentColor">
                        <animate attributeName="r" values="1;2;1" dur="2s" repeatCount="indefinite" begin="0.5s"/>
                      </circle>
                      <circle cx="16" cy="18" r="1.5" fill="currentColor">
                        <animate attributeName="r" values="1;2;1" dur="2s" repeatCount="indefinite" begin="1s"/>
                      </circle>
                      <circle cx="10" cy="16" r="1.5" fill="currentColor">
                        <animate attributeName="r" values="1;2;1" dur="2s" repeatCount="indefinite" begin="1.5s"/>
                      </circle>
                      <!-- Connecting lines -->
                      <line x1="12" y1="10" x2="16" y2="18" stroke="currentColor" stroke-width="0.5" opacity="0.5">
                        <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite"/>
                      </line>
                      <line x1="20" y1="12" x2="10" y2="16" stroke="currentColor" stroke-width="0.5" opacity="0.5">
                        <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" begin="1s"/>
                      </line>
                    </g>
                    <!-- Query bubble -->
                    <rect x="4" y="24" width="24" height="6" rx="3" fill="currentColor" opacity="0.3"/>
                    <text x="16" y="28" text-anchor="middle" fill="white" class="text-xs">AI Processing</text>
                  </svg>
                </div>
                <h3 class="text-xl font-bold mb-3 text-center text-theme">Intelligent Q&A</h3>
                <p class="text-center opacity-80 leading-relaxed text-theme-muted">Ask natural language questions and get accurate answers based on your uploaded documents with source citations.</p>
              </div>
            </div>
          </div>

          <div class="group relative">
            <div class="card p-8 hover-lift fade-in-up h-full relative overflow-hidden">
              <!-- Background glow effect -->
              <div class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div class="relative z-10">
                <div class="text-purple-400 mb-6 flex justify-center">
                  <svg width="64" height="64" viewBox="0 0 32 32" fill="none" class="hover:scale-110 transition-transform duration-300">
                    <!-- Citation/Reference Icon -->
                    <rect x="6" y="4" width="20" height="24" rx="2" fill="currentColor" opacity="0.2"/>
                    <rect x="8" y="6" width="16" height="20" rx="1" fill="currentColor" opacity="0.1"/>
                    
                    <!-- Quote marks -->
                    <path d="M10 12 Q9 11 10 10 Q11 11 10 12" fill="currentColor" opacity="0.8">
                      <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
                    </path>
                    <path d="M22 12 Q21 11 22 10 Q23 11 22 12" fill="currentColor" opacity="0.8">
                      <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" begin="1s"/>
                    </path>
                    
                    <!-- Text lines -->
                    <line x1="10" y1="15" x2="22" y2="15" stroke="currentColor" stroke-width="0.5" opacity="0.6"/>
                    <line x1="10" y1="17" x2="20" y2="17" stroke="currentColor" stroke-width="0.5" opacity="0.6"/>
                    <line x1="10" y1="19" x2="22" y2="19" stroke="currentColor" stroke-width="0.5" opacity="0.6"/>
                    
                    <!-- Source link -->
                    <circle cx="20" cy="22" r="2" fill="currentColor" opacity="0.6">
                      <animate attributeName="r" values="1.5;2.5;1.5" dur="2s" repeatCount="indefinite"/>
                    </circle>
                    <path d="M18 24 L22 24" stroke="currentColor" stroke-width="1" opacity="0.8"/>
                  </svg>
                </div>
                <h3 class="text-xl font-bold mb-3 text-center text-theme">Source Citations</h3>
                <p class="text-center opacity-80 leading-relaxed text-theme-muted">Every answer includes precise citations with page numbers and document references for complete transparency.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Enhanced Pricing Section -->
  <section id="pricing" class="w-full py-20 relative overflow-hidden">
      <!-- Animated background elements -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute top-20 left-10 w-72 h-72 bg-sky-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 2s;"></div>
      </div>
      
      <div class="max-w-7xl mx-auto px-4 relative z-10">
        <div class="text-center mb-16">
          <h2 class="text-4xl sm:text-5xl font-bold mb-6">
            <span class="bg-gradient-to-r from-emerald-500 to-sky-600 bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </span>
          </h2>
          <p class="text-xl opacity-80 max-w-2xl mx-auto text-theme-muted">
            Choose the perfect plan for your document analysis needs
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <!-- Starter Plan -->
          <div class="card p-6 hover-lift relative overflow-hidden">
            <!-- Background Glow -->
            <div class="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-blue-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            <div class="relative">
              <h3 class="text-lg font-semibold text-theme">Starter</h3>
              <p class="text-sm opacity-70 text-theme-muted">Perfect for individuals</p>
              <p class="mt-4 text-3xl font-bold text-theme">Free</p>
              <ul class="mt-4 space-y-2 text-sm opacity-80 text-theme-muted">
                <li>• 5 documents</li>
                <li>• 100 questions/month</li>
                <li>• Email support</li>
              </ul>
              <a routerLink="/register" class="btn btn-outline mt-6 w-full justify-center hover-scale">Get Started</a>
            </div>
          </div>

          <!-- Pro Plan -->
          <div class="card p-6 border-indigo-700/40 hover-lift relative overflow-hidden">
            <!-- Popular Badge -->
            <div class="absolute -right-3 -top-3 bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xs px-3 py-1 rounded-full transform rotate-12 shadow-lg">
              Popular
              <div class="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
            </div>
            <!-- Background Glow -->
            <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/8 to-purple-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            <div class="relative">
              <h3 class="text-lg font-semibold text-theme">Pro</h3>
              <p class="text-sm opacity-70 text-theme-muted">For power users</p>
              <p class="mt-4 text-3xl font-bold text-theme">$9<span class="text-base font-medium opacity-70">/mo</span></p>
              <ul class="mt-4 space-y-2 text-sm opacity-80 text-theme-muted">
                <li>• 100 documents</li>
                <li>• 10k questions/month</li>
                <li>• Priority support</li>
              </ul>
              <a routerLink="/register" class="btn btn-primary mt-6 w-full justify-center hover-scale">Upgrade</a>
            </div>
          </div>

          <!-- Team Plan -->
          <div class="card p-6 border-emerald-700/40 hover-lift relative overflow-hidden">
            <!-- Background Glow -->
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
  <footer class="py-12 border-t border-theme bg-theme/80 backdrop-blur">
      <div class="max-w-6xl mx-auto px-4 text-center">
        <p class="opacity-60 text-theme-muted">© {{year}} RAG Conversational AI. All rights reserved.</p>
      </div>
    </footer>
  </div>
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

  constructor(public theme: ThemeService) {}
  
  toggleTheme(){ this.theme.toggle(); }
  
  toggleFaq(index: number) {
    this.expandedFaq = this.expandedFaq === index ? -1 : index;
  }
}
