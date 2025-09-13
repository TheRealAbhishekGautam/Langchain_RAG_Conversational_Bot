import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DocumentsService } from '../../services/documents.service';
import { DocumentInfo } from '../../types/models';

@Component({
  selector: 'app-documents-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="h-full flex flex-col">
  <div class="p-6 border-b border-theme flex items-center justify-between bg-theme/80">
      <div>
        <h2 class="text-lg font-semibold">Documents</h2>
  <p class="text-xs text-theme-muted">Manage knowledge base documents</p>
      </div>
      <label class="btn btn-primary cursor-pointer">
        <input type="file" hidden (change)="upload($event)" accept=".pdf,.docx" />
        Upload
      </label>
    </div>

    <div class="flex-1 overflow-auto p-6 space-y-4">
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div *ngFor="let d of documents()" class="card p-4 flex flex-col gap-3">
          <div class="flex items-start justify-between gap-2">
            <div class="flex-1 min-w-0">
              <h3 class="font-medium text-sm truncate" title="{{ d.filename }}">{{ d.filename }}</h3>
              <p class="text-[11px] text-theme-muted">{{ d.file_type.toUpperCase() }} • {{ d.chunk_count }} chunks</p>
            </div>
            <button class="text-xs text-red-400 hover:text-red-300" (click)="remove(d)" [disabled]="loading()">Delete</button>
          </div>
          <p class="text-[11px] text-theme-muted">Uploaded {{ d.upload_timestamp | date:'short' }}</p>
        </div>
      </div>
  <p *ngIf="documents().length===0 && !loading()" class="text-sm text-theme-muted">No documents uploaded yet.</p>
      <p *ngIf="error()" class="text-xs text-red-400">{{ error() }}</p>
    </div>
  </div>
  `
})
export class DocumentsPageComponent {
  documents = signal<DocumentInfo[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(private docs: DocumentsService) {
    this.refresh();
  }

  refresh() {
    this.loading.set(true);
    this.docs.listDocuments().subscribe({
      next: (r: any) => {
        if (r.success) this.documents.set(r.documents);
        this.loading.set(false);
      },
      error: (e: any) => {
        this.error.set('Failed to load documents');
        this.loading.set(false);
      }
    });
  }

  upload(ev: Event) {
    const input = ev.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    this.loading.set(true);
    this.docs.uploadDocument(formData).subscribe({
      next: (r: any) => {
        this.refresh();
      },
      error: (e: any) => {
        this.error.set(e.message || 'Upload failed');
        this.loading.set(false);
      }
    });
  }

  remove(d: DocumentInfo) {
    if (!confirm('Delete document?')) return;
    this.loading.set(true);
    this.docs.deleteDocument(d.document_id).subscribe({
      next: (r: any) => this.refresh(),
      error: (e: any) => {
        this.error.set('Delete failed');
        this.loading.set(false);
      }
    });
  }
}
