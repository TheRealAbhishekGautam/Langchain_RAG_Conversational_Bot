import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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
          <button
            class="btn btn-outline text-lg"
            (click)="toggleTheme()"
            [attr.aria-label]="theme.theme()==='dark' ? 'Switch to light mode' : 'Switch to dark mode'"
            [title]="theme.theme()==='dark' ? 'Light mode' : 'Dark mode'"
          >
            {{ theme.theme()==='dark' ? '☀️' : '🌙' }}
          </button>
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
          <div class="grid lg:grid-cols-2 gap-12 items-center mb-12">
            <!-- Left Side - Text Content -->
            <div class="text-center lg:text-left">
              <h1 class="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
                <span class="bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                  Chat with your documents
                </span>
                <br>
                <span class="text-theme">using AI</span>
              </h1>
              <p class="text-xl sm:text-2xl text-theme-secondary mb-8">
                Upload multiple PDFs and DOCX files and get precise, grounded answers with citations from your content.
              </p>
              <div class="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
                <a routerLink="/register" class="btn btn-primary text-lg px-8 py-3 hover-scale">Create free account</a>
                <a routerLink="/login" class="btn btn-outline text-lg px-8 py-3 hover-scale">Sign in</a>
              </div>
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
    <section class="w-full py-16 relative">
      <div class="max-w-7xl mx-auto px-4">
        <!-- Section Header -->
        <div class="text-center mb-12">
          <h2 class="text-4xl sm:text-5xl font-bold mb-4">
            <span class="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              How does it work?
            </span>
          </h2>
          <p class="text-xl text-theme-secondary max-w-3xl mx-auto">
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
                  <g class="query-vectors" transform="translate(120, 120)">
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
                <g class="similarity-search" transform="translate(400, 280)">
                  <rect x="50" y="-40" width="200" height="120" rx="15" fill="var(--bg)" stroke="currentColor" stroke-width="2" class="text-orange-500" opacity="0.2">
                    <animate attributeName="opacity" values="0.1;0.3;0.1" dur="3.2s" repeatCount="indefinite"/>
                  </rect>
                  <text x="150" y="0" text-anchor="middle" fill="currentColor" class="text-sm font-semibold text-theme">🔍 Similarity Search</text>
                  
                  <!-- Search visualization -->
                  <g class="search-viz" transform="translate(120, 40)">
                    <circle cx="0" cy="0" r="25" fill="none" stroke="currentColor" stroke-width="2" class="text-orange-400" opacity="0.5">
                      <animate attributeName="r" values="20;30;20" dur="3s" repeatCount="indefinite"/>
                      <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="0" cy="0" r="5" fill="currentColor" class="text-orange-500"/>
                    
                    <!-- Relevant documents found -->
                    <g class="found-docs">
                      <rect x="-8" y="-40" width="16" height="20" rx="2" fill="currentColor" class="text-yellow-400" opacity="0.8">
                        <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
                      </rect>
                      <rect x="25" y="-15" width="16" height="20" rx="2" fill="currentColor" class="text-yellow-400" opacity="0.7">
                        <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2.5s" repeatCount="indefinite"/>
                      </rect>
                      <rect x="-35" y="15" width="16" height="20" rx="2" fill="currentColor" class="text-yellow-400" opacity="0.6">
                        <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite"/>
                      </rect>
                    </g>
                  </g>
                </g>

                <!-- Answer Generation (Bottom-Right) -->
                <g class="answer-generation" transform="translate(750, 320)">
                  <rect x="50" y="-40" width="200" height="120" rx="15" fill="var(--bg)" stroke="currentColor" stroke-width="2" class="text-purple-500" opacity="0.2">
                    <animate attributeName="opacity" values="0.1;0.3;0.1" dur="4.5s" repeatCount="indefinite"/>
                  </rect>
                  <text x="150" y="0" text-anchor="middle" fill="currentColor" class="text-sm font-semibold text-theme">💡 Answer Generation</text>
                  
                  <!-- Generated answer -->
                  <rect x="70" y="40" width="160" height="80" rx="10" fill="var(--primary)" opacity="0.9">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="4s" repeatCount="indefinite"/>
                  </rect>
                  <text x="150" y="65" text-anchor="middle" fill="#fff" class="text-xs">Based on the analysis of</text>
                  <text x="150" y="80" text-anchor="middle" fill="#fff" class="text-xs">3 relevant documents,</text>
                  <text x="150" y="95" text-anchor="middle" fill="#fff" class="text-xs">the key findings are...</text>
                  <text x="150" y="110" text-anchor="middle" fill="#fff" class="text-xs font-bold">📎 With citations</text>
                </g>

                <!-- Data Flow Arrows -->
                <g class="data-flow">
                  <!-- Upload to Vector Processing -->
                  <path d="M300 140 Q340 160 380 180" stroke="currentColor" stroke-width="3" fill="none" class="text-sky-500" marker-end="url(#arrowhead)">
                    <animate attributeName="stroke-dasharray" values="0 100; 50 50; 100 0" dur="3s" repeatCount="indefinite"/>
                  </path>
                  
                  <!-- Query to Similarity Search -->
                  <path d="M620 160 Q620 200 600 240" stroke="currentColor" stroke-width="3" fill="none" class="text-emerald-500" marker-end="url(#arrowhead)">
                    <animate attributeName="stroke-dasharray" values="0 100; 50 50; 100 0" dur="3s" repeatCount="indefinite" begin="1s"/>
                  </path>
                  
                  <!-- Vector Processing to Similarity Search -->
                  <path d="M480 240 Q520 250 550 280" stroke="currentColor" stroke-width="3" fill="none" class="text-indigo-500" marker-end="url(#arrowhead)">
                    <animate attributeName="stroke-dasharray" values="0 100; 50 50; 100 0" dur="3s" repeatCount="indefinite" begin="0.5s"/>
                  </path>
                  
                  <!-- Similarity Search to Answer Generation -->
                  <path d="M600 320 Q700 320 750 320" stroke="currentColor" stroke-width="3" fill="none" class="text-orange-500" marker-end="url(#arrowhead)">
                    <animate attributeName="stroke-dasharray" values="0 100; 50 50; 100 0" dur="3s" repeatCount="indefinite" begin="2s"/>
                  </path>
                </g>
            </svg>
          </div>
          
          <!-- Process Steps Description -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
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
    <section id="features" class="py-20 bg-gradient-to-br from-theme-bg to-theme-bg/50">
      <div class="max-w-6xl mx-auto px-4">
        <h2 class="text-4xl font-bold text-center mb-16 text-theme">
          <span class="bg-gradient-to-r from-sky-400 to-indigo-600 bg-clip-text text-transparent">
            Powerful Features
          </span>
        </h2>
        
        <div class="grid lg:grid-cols-3 gap-8">
          <div class="card p-8 hover-lift">
            <div class="w-16 h-16 bg-gradient-to-br from-sky-400 to-sky-600 rounded-2xl flex items-center justify-center mb-6 ai-element">
              <span class="text-2xl">📄</span>
            </div>
            <h3 class="text-xl font-semibold mb-4 text-theme">Multi-Format Support</h3>
            <p class="opacity-80 text-theme-secondary">Upload PDFs, Word documents, and text files. Our AI understands the structure and content of your documents.</p>
          </div>
          
          <div class="card p-8 hover-lift">
            <div class="w-16 h-16 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 ai-element">
              <span class="text-2xl">🎯</span>
            </div>
            <h3 class="text-xl font-semibold mb-4 text-theme">Precise Answers</h3>
            <p class="opacity-80 text-theme-secondary">Get accurate, contextual answers grounded in your documents with exact source citations and page references.</p>
          </div>
          
          <div class="card p-8 hover-lift">
            <div class="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mb-6 ai-element">
              <span class="text-2xl">⚡</span>
            </div>
            <h3 class="text-xl font-semibold mb-4 text-theme">Lightning Fast</h3>
            <p class="opacity-80 text-theme-secondary">Advanced vector search and caching provide instant responses to your questions across large document collections.</p>
          </div>
          
          <div class="card p-8 hover-lift">
            <div class="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 ai-element">
              <span class="text-2xl">🔒</span>
            </div>
            <h3 class="text-xl font-semibold mb-4 text-theme">Secure & Private</h3>
            <p class="opacity-80 text-theme-secondary">Enterprise-grade security ensures your documents remain private. Full GDPR compliance and data encryption.</p>
          </div>
          
          <div class="card p-8 hover-lift">
            <div class="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mb-6 ai-element">
              <span class="text-2xl">👥</span>
            </div>
            <h3 class="text-xl font-semibold mb-4 text-theme">Team Collaboration</h3>
            <p class="opacity-80 text-theme-secondary">Share document collections and insights with your team. Role-based access and collaborative workspaces.</p>
          </div>
          
          <div class="card p-8 hover-lift">
            <div class="w-16 h-16 bg-gradient-to-br from-rose-400 to-rose-600 rounded-2xl flex items-center justify-center mb-6 ai-element">
              <span class="text-2xl">📊</span>
            </div>
            <h3 class="text-xl font-semibold mb-4 text-theme">Smart Analytics</h3>
            <p class="opacity-80 text-theme-secondary">Track usage patterns, popular queries, and document insights to optimize your knowledge management.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="py-20 gradient-animated">
      <div class="max-w-6xl mx-auto px-4">
        <h2 class="text-4xl font-bold text-center mb-16 text-theme">
          <span class="bg-gradient-to-r from-indigo-400 to-purple-600 bg-clip-text text-transparent">
            What Our Users Say
          </span>
        </h2>
        
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
      <div class="max-w-6xl mx-auto px-4">
        <h2 class="text-4xl font-bold text-center mb-16 text-theme">
          <span class="bg-gradient-to-r from-sky-400 to-indigo-600 bg-clip-text text-transparent">
            Simple Pricing
          </span>
        </h2>
        
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
  <footer class="py-12 border-t border-theme bg-theme/80 backdrop-blur">
      <div class="max-w-6xl mx-auto px-4 text-center">
        <p class="opacity-60 text-theme-muted">© {{year}} RAG Conversational AI. All rights reserved.</p>
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

  constructor(public theme: ThemeService) {}
  
  toggleTheme(){ this.theme.toggle(); }
  
  toggleFaq(index: number) {
    this.expandedFaq = this.expandedFaq === index ? -1 : index;
  }
}