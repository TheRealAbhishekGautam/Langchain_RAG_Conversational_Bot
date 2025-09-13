import { Component, Input, signal } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { DocumentsService } from '../../services/documents.service';
import { DocumentInfo } from '../../types/models';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-private-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent],
  template: `
    <div class="flex h-screen w-full overflow-hidden">
      <app-sidebar class="w-72 shrink-0" [documents]="documents()"
        (openDocuments)="router.navigate(['/documents'])"
        (startNewSession)="router.navigate(['/conversation'])"
        (selectSession)="goToSession($event)"
      ></app-sidebar>
      <main class="flex-1 h-full overflow-hidden relative">
        <header class="absolute top-0 right-0 p-3 z-10">
          <div class="flex items-center gap-3">
            <span class="text-sm text-theme-secondary" *ngIf="auth.user()">Hello, {{ auth.user()!.username }}</span>
            <button class="btn btn-outline text-xs" (click)="logout()">Logout</button>
          </div>
        </header>
        <router-outlet></router-outlet>
      </main>
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
}
