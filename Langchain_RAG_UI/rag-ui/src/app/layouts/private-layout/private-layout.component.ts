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
  template: `
    <div class="flex w-full" [style.overflow]="isConversationRoute ? 'visible' : 'hidden'" [style.height]="'calc(100dvh - 5rem)'" [style.minHeight]="'calc(100vh - 5rem)'">
      <app-sidebar class="w-72 shrink-0" [class.relative]="isConversationRoute" [style.zIndex]="isConversationRoute ? 50 : null"
        [style.marginTop]="isConversationRoute ? '-5rem' : null"
        [style.height]="isConversationRoute ? '100dvh' : null"
        (startNewSession)="router.navigate(['/conversation'])"
        (selectSession)="goToSession($event)"
      ></app-sidebar>
      <main class="flex-1 h-full overflow-hidden relative">
        <router-outlet></router-outlet>
      </main>
      <app-documents-panel class="w-72 shrink-0" [class.relative]="isConversationRoute" [style.zIndex]="isConversationRoute ? 50 : null" [documents]="documents()"
        [style.marginTop]="isConversationRoute ? '-5rem' : null"
        [style.height]="isConversationRoute ? '100dvh' : null"
      ></app-documents-panel>
    </div>
  `
})
export class PrivateLayoutComponent {
  documents = signal<DocumentInfo[]>([]);

  constructor(public router: Router, private docs: DocumentsService, public auth: AuthService) {
    this.fetchDocuments();
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

  get isConversationRoute() {
    try {
      const url = this.router.url || '';
      return url.startsWith('/conversation');
    } catch {
      return false;
    }
  }
}
