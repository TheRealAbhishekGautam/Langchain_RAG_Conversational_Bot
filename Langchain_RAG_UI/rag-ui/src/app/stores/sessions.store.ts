import { Injectable, signal } from '@angular/core';
import { Session } from '../types/models';

const STORAGE_KEY = 'rag_sessions_v1';

@Injectable({ providedIn: 'root' })
export class SessionsStore {
  sessions = signal<Session[]>(this.load());

  private load(): Session[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  private persist() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(this.sessions())); } catch {}
  }

  upsertSession(session: Session) {
    const list = this.sessions();
  const idx = list.findIndex((s: Session) => s.id === session.id);
    const now = new Date().toISOString();
    session.updatedAt = now;
    if (!session.createdAt) session.createdAt = now;
    if (idx >= 0) list[idx] = { ...list[idx], ...session };
    else list.unshift(session);
    this.sessions.set([...list]);
    this.persist();
  }

  getSession(id: string) { return this.sessions().find((s: Session) => s.id === id); }
}
