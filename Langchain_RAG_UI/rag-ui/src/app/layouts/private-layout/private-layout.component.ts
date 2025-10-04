import { Component, Input, signal } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { DocumentsPanelComponent } from '../../components/documents-panel/documents-panel.component';
import { DocumentsService } from '../../services/documents.service';
import { DocumentInfo } from '../../types/models';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-private-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, DocumentsPanelComponent],
  styles: [`
    .panel-transition {
      transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1), min-width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      will-change: width, min-width;
    }
    
    .collapse-button {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 32px;
      height: 64px;
      background: var(--bg-elev);
      border: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1), right 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
      backdrop-filter: blur(8px);
      outline: none;
    }
    
    .collapse-button-fixed {
      position: fixed;
      top: 50%;
      transform: translateY(-50%);
      width: 32px;
      height: 64px;
      background: var(--bg-elev);
      border: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1), right 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
      backdrop-filter: blur(8px);
      outline: none;
      will-change: left, right;
    }


    
    .z-60 {
      z-index: 60;
    }
    
    .collapse-button:hover,
    .collapse-button-fixed:hover {
      background: var(--bg-hover);
      border-color: var(--accent-1);
      transform: translateY(-50%) scale(1.05);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1), right 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
    }
    
    .collapse-button:focus-visible,
    .collapse-button-fixed:focus-visible {
      border-color: var(--accent-1);
      box-shadow: 0 0 0 2px var(--accent-1);
    }
    
    .collapse-button:active,
    .collapse-button-fixed:active {
      transform: translateY(-50%) scale(0.95);
      transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1), right 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.1s ease, border-color 0.1s ease, box-shadow 0.1s ease, transform 0.1s ease;
    }
    
    .collapse-button-left {
      border-radius: 0 8px 8px 0;
    }
    
    .collapse-button-right {
      border-radius: 8px 0 0 8px;
    }
    
    .arrow-icon {
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      color: var(--theme);
    }
    
    .arrow-icon.flipped {
      transform: rotate(180deg);
    }
  `],
  template: `
    <div class="relative w-full h-full overflow-hidden">
      <!-- Left Sidebar - Overlaps top bar -->
      <div class="fixed left-0 top-0 panel-transition z-50" 
           [style.width]="leftPanelCollapsed() ? '0px' : '288px'"
           [style.min-width]="leftPanelCollapsed() ? '0px' : '288px'"
           [style.overflow]="leftPanelCollapsed() ? 'hidden' : 'visible'"
           style="height: 100vh;">
        <app-sidebar class="w-72 h-full"
          (startNewSession)="router.navigate(['/conversation'])"
          (selectSession)="goToSession($event)"
        ></app-sidebar>
      </div>

      <!-- Right Documents Panel - Overlaps top bar -->
      <div class="fixed right-0 top-0 panel-transition z-50" 
           [style.width]="rightPanelCollapsed() ? '0px' : '288px'"
           [style.min-width]="rightPanelCollapsed() ? '0px' : '288px'"
           [style.overflow]="rightPanelCollapsed() ? 'hidden' : 'visible'"
           style="height: 100vh;">
        <app-documents-panel class="w-72 h-full"
          [documents]="documents()"
        ></app-documents-panel>
      </div>

      <!-- Left Panel Collapse Button -->
      <button class="collapse-button-fixed collapse-button-left z-60" 
              [style.left]="leftPanelCollapsed() ? '0px' : '288px'"
              (click)="toggleLeftPanel()"
              (keydown.enter)="toggleLeftPanel($event)"
              (keydown.space)="toggleLeftPanel($event)"
              [attr.aria-label]="leftPanelCollapsed() ? 'Expand sessions panel' : 'Collapse sessions panel'"
              [attr.aria-expanded]="!leftPanelCollapsed()"
              tabindex="0">
        <svg class="arrow-icon" 
             [class.flipped]="leftPanelCollapsed()"
             width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15,18 9,12 15,6"></polyline>
        </svg>
      </button>

      <!-- Right Panel Collapse Button -->
      <button class="collapse-button-fixed collapse-button-right z-60" 
              [style.right]="rightPanelCollapsed() ? '0px' : '288px'"
              (click)="toggleRightPanel()"
              (keydown.enter)="toggleRightPanel($event)"
              (keydown.space)="toggleRightPanel($event)"
              [attr.aria-label]="rightPanelCollapsed() ? 'Expand documents panel' : 'Collapse documents panel'"
              [attr.aria-expanded]="!rightPanelCollapsed()"
              tabindex="0">
        <svg class="arrow-icon" 
             [class.flipped]="rightPanelCollapsed()"
             width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9,18 15,12 9,6"></polyline>
        </svg>
      </button>

      <!-- Main Content Area - Fixed position, always centered -->
      <main class="w-full h-full overflow-hidden relative">
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class PrivateLayoutComponent {
  documents = signal<DocumentInfo[]>([]);
  leftPanelCollapsed = signal(false);
  rightPanelCollapsed = signal(false);

  constructor(public router: Router, private docs: DocumentsService, public auth: AuthService) {
    this.fetchDocuments();
    this.loadPanelStates();
  }

  fetchDocuments() {
    this.docs.listDocuments(100).subscribe({
      next: (r: any) => { if (r.success) this.documents.set(r.documents); },
      error: () => {}
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  goToSession(id: string) {
    this.router.navigate(['/conversation', id]);
  }

  toggleLeftPanel(event?: Event) {
    event?.preventDefault();
    this.leftPanelCollapsed.update(collapsed => {
      const newState = !collapsed;
      localStorage.setItem('leftPanelCollapsed', JSON.stringify(newState));
      return newState;
    });
  }

  toggleRightPanel(event?: Event) {
    event?.preventDefault();
    this.rightPanelCollapsed.update(collapsed => {
      const newState = !collapsed;
      localStorage.setItem('rightPanelCollapsed', JSON.stringify(newState));
      return newState;
    });
  }

  private loadPanelStates() {
    try {
      const leftState = localStorage.getItem('leftPanelCollapsed');
      const rightState = localStorage.getItem('rightPanelCollapsed');
      
      if (leftState !== null) {
        this.leftPanelCollapsed.set(JSON.parse(leftState));
      }
      if (rightState !== null) {
        this.rightPanelCollapsed.set(JSON.parse(rightState));
      }
    } catch (error) {
      // If localStorage is not available or parsing fails, use defaults
      console.warn('Could not load panel states from localStorage:', error);
    }
  }

  get isConversationRoute() {
    try {
      const url = this.router.url || '';
      return url.startsWith('/conversation');
    } catch {
      return false;
    }
  }
}
