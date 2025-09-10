import { Component, effect, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DocumentsService } from './services/documents.service';
import { DocumentInfo } from './types/models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  template: `
    <div class="flex h-screen w-full overflow-hidden">
      <app-sidebar class="w-72 shrink-0" [documents]="documents()" (openDocuments)="openDocuments()" (startNewSession)="startNewSession()" (selectSession)="openSession($event)"></app-sidebar>
      <main class="flex-1 h-full overflow-hidden">
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class AppComponent {
  documents = signal<DocumentInfo[]>([]);

  constructor(private router: Router, private docs: DocumentsService) {
    this.fetchDocuments();
  }

  fetchDocuments() {
    this.docs.listDocuments(100).subscribe({
      next: (r: any) => { if (r.success) this.documents.set(r.documents); },
      error: () => {}
    });
  }

  openDocuments() { this.router.navigate(['/documents']); }
  startNewSession() { this.router.navigate(['/conversation']); }
  openSession(id: string) { this.router.navigate(['/conversation', id]); }
}
