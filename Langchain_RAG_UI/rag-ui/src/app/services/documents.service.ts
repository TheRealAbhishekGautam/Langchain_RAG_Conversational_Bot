import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddDocumentResponse, DeleteDocumentResponse, DocumentListResponse } from '../types/models';
import { environment } from '../utils/environment';

@Injectable({ providedIn: 'root' })
export class DocumentsService {
  private http = inject(HttpClient);
  private base = environment.apiBaseUrl;

  uploadDocument(formData: FormData): Observable<AddDocumentResponse> {
    return this.http.post<AddDocumentResponse>(`${this.base}/api/documents/add`, formData);
  }

  listDocuments(limit = 50, offset = 0): Observable<DocumentListResponse> {
    return this.http.post<DocumentListResponse>(`${this.base}/api/documents/list`, { limit, offset });
  }

  deleteDocument(document_id: string): Observable<DeleteDocumentResponse> {
    return this.http.request<DeleteDocumentResponse>('DELETE', `${this.base}/api/documents/delete`, { body: { document_id } });
  }
}
