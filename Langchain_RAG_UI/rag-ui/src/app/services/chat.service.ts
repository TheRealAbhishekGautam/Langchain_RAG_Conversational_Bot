import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConversationRequest, ConversationResponse } from '../types/models';
import { environment } from '../utils/environment';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private http = inject(HttpClient);
  private base = environment.apiBaseUrl;

  ask(req: ConversationRequest): Observable<ConversationResponse> {
    return this.http.post<ConversationResponse>(`${this.base}/api/conversation`, req);
  }
}
