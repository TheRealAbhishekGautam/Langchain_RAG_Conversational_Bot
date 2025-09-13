import { Injectable, signal, effect } from '@angular/core';

const THEME_KEY = 'rag_theme';
export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  theme = signal<Theme>(this.loadTheme());

  constructor() {
    effect(() => this.applyTheme(this.theme()));
  }

  toggle() { this.theme.set(this.theme() === 'dark' ? 'light' : 'dark'); this.persist(); }
  set(theme: Theme) { this.theme.set(theme); this.persist(); }

  private applyTheme(t: Theme) {
    const el = document.documentElement; // <html>
    el.classList.remove('theme-dark', 'theme-light', 'dark', 'light');
    el.classList.add(`theme-${t}`, t);
  }

  private loadTheme(): Theme {
    try { return (localStorage.getItem(THEME_KEY) as Theme) || 'light'; } catch { return 'light'; }
  }

  private persist() {
    try { localStorage.setItem(THEME_KEY, this.theme()); } catch {}
  }
}
