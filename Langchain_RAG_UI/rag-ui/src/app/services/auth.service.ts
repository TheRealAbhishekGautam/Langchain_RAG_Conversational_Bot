import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../utils/environment';
import { UserInfo, UserLoginRequest, UserLoginResponse, UserRegistrationRequest, UserRegistrationResponse, ForgotPasswordRequest, ForgotPasswordResponse, ResetPasswordRequest, ResetPasswordResponse } from '../types/models';
import { tap } from 'rxjs/operators';

const TOKEN_KEY = 'rag_access_token';
const USER_KEY = 'rag_user_info';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = environment.apiBaseUrl;
  private _token = signal<string | null>(this.loadToken());
  private _user = signal<UserInfo | null>(this.loadUser());

  token = computed(() => this._token());
  user = computed(() => this._user());
  isAuthenticated = computed(() => !!this._token());

  constructor(private http: HttpClient) {}

  private loadToken(): string | null {
    try {
      return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
    } catch { return null; }
  }
  private loadUser(): UserInfo | null {
    try { const raw = localStorage.getItem(USER_KEY); return raw ? JSON.parse(raw) as UserInfo : null; } catch { return null; }
  }
  private persist(remember = true) {
    try {
      const store = remember ? localStorage : sessionStorage;
      const other = remember ? sessionStorage : localStorage;
      if (this._token()) store.setItem(TOKEN_KEY, this._token()!); else { localStorage.removeItem(TOKEN_KEY); sessionStorage.removeItem(TOKEN_KEY); }
      if (this._user()) store.setItem(USER_KEY, JSON.stringify(this._user()!)); else { localStorage.removeItem(USER_KEY); sessionStorage.removeItem(USER_KEY); }
      // Clean up in the other storage when setting
      other.removeItem(TOKEN_KEY); other.removeItem(USER_KEY);
    } catch {}
  }

  register(payload: UserRegistrationRequest) {
    return this.http.post<UserRegistrationResponse>(`${this.base}/api/auth/register`, payload);
  }

  login(payload: UserLoginRequest, remember = true) {
    return this.http.post<UserLoginResponse>(`${this.base}/api/auth/login`, payload).pipe(
      tap(res => {
        if (res.success && res.access_token) {
          this._token.set(res.access_token);
          if (res.user_info) this._user.set(res.user_info);
          this.persist(remember);
        }
      })
    );
  }

  logout() {
    this._token.set(null);
    this._user.set(null);
    this.persist();
  }

  forgotPassword(payload: ForgotPasswordRequest) {
    return this.http.post<ForgotPasswordResponse>(`${this.base}/api/auth/forgot-password`, payload);
  }

  resetPassword(payload: ResetPasswordRequest) {
    return this.http.post<ResetPasswordResponse>(`${this.base}/api/auth/reset-password`, payload);
  }
}
