import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { SessionsStore } from '../../stores/sessions.store';
import { Session, ChatMessage } from '../../types/models';

@Component({
  selector: 'app-conversation-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styles: [`
    .conversation-container {
      height: 100%;
      overflow: hidden;
    }
    
    .messages-area {
      flex: 1;
      overflow-y: auto;
      min-height: 0;
      scrollbar-width: thin;
    }
    
    .messages-area::-webkit-scrollbar {
      width: 8px;
    }
    
    .messages-area::-webkit-scrollbar-track {
      background: transparent;
    }
    
    .messages-area::-webkit-scrollbar-thumb {
      background: var(--border);
      border-radius: 9999px;
    }
    
    .messages-area::-webkit-scrollbar-thumb:hover {
      background: color-mix(in oklab, var(--border), white 10%);
    }
    
    .input-area {
      flex-shrink: 0;
    }
    
    .fade-in {
      animation: fadeIn 0.3s ease-in;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `],
  template: `
  <div class="conversation-container flex flex-col">
    <div class="messages-area p-8 space-y-6" #scrollContainer>
      <div *ngIf="messages().length === 0" class="h-full flex items-center justify-center text-center text-theme-muted">
        <div>
          <h2 class="text-xl font-semibold mb-2">Ask anything about your documents</h2>
          <p class="text-sm">Upload documents in the Documents section and start a conversation.</p>
        </div>
      </div>

      <div *ngFor="let m of messages()" class="flex flex-col gap-2 fade-in">
        <div class="flex items-start gap-3" [class.flex-row-reverse]="m.role==='user'">
          <div class="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold"
               [class.bg-primary-600]="m.role==='user'" [style.background]="m.role==='ai' ? 'var(--bg-elev)' : ''">
            {{ m.role==='user' ? 'You' : 'AI' }}
          </div>
          <div class="chat-bubble" [class.chat-bubble-user]="m.role==='user'" [class.chat-bubble-ai]="m.role==='ai'">
            <p class="whitespace-pre-wrap leading-relaxed text-sm">{{ m.content }}</p>
            <div *ngIf="m.sources?.length" class="mt-2 flex flex-wrap gap-1">
              <span *ngFor="let s of m.sources" class="badge text-[10px]">Source: {{ s }}</span>
            </div>
            <span class="block mt-1 text-[10px] text-theme-muted">{{ m.timestamp | date:'shortTime' }}</span>
          </div>
        </div>
      </div>
    </div>

    <form (ngSubmit)="send()" class="input-area p-4 border-t border-theme bg-theme/80 backdrop-blur">
      <div class="max-w-4xl mx-auto flex gap-3">
        <textarea [(ngModel)]="question" name="question" rows="1" required
          placeholder="Ask a question..." class="input resize-none flex-1"></textarea>
        <button class="btn btn-primary px-6" [disabled]="loading()">{{ loading() ? 'Thinking...' : 'Send' }}</button>
      </div>
      <p *ngIf="error()" class="text-xs text-red-400 mt-2 text-center">{{ error() }}</p>
    </form>
  </div>
  `
})
export class ConversationPageComponent {
  question = '';
  messages = signal<ChatMessage[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  sessionId?: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chat: ChatService,
    public sessionsStore: SessionsStore
  ) {
  this.route.paramMap.subscribe((p: any) => {
      const id = p.get('sessionId');
      if (id) {
        this.sessionId = id;
        const existing = this.sessionsStore.getSession(id);
        if (existing) this.messages.set(existing.messages);
      }
    });
  }

  async send() {
    if (!this.question.trim()) return;
    const q = this.question.trim();
    this.question = '';
    const msg: ChatMessage = { id: crypto.randomUUID(), role: 'user', content: q, timestamp: new Date().toISOString() };
  this.messages.update((m: ChatMessage[]) => [...m, msg]);
    this.loading.set(true);
    this.error.set(null);

    try {
      const resp = await this.chat.ask({ session_id: this.sessionId, question: q }).toPromise();
      if (resp) {
        this.sessionId = resp.session_id;
        const ai: ChatMessage = { id: crypto.randomUUID(), role: 'ai', content: resp.answer, sources: resp.sources, timestamp: resp.response_timestamp };
  this.messages.update((m: ChatMessage[]) => [...m, ai]);
        this.sessionsStore.upsertSession({ id: this.sessionId!, title: mTitleFromFirst(this.messages()), messages: this.messages() });
        if (!this.route.snapshot.paramMap.get('sessionId')) {
          this.router.navigate(['/conversation', this.sessionId]);
        }
      }
    } catch (e: any) {
      this.error.set(e.message || 'Error');
    } finally {
      this.loading.set(false);
    }
  }
}

function mTitleFromFirst(messages: ChatMessage[]) {
  const firstUser = messages.find(m => m.role==='user');
  return firstUser ? firstUser.content.slice(0, 40) : 'New Session';
}
