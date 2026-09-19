import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, of } from 'rxjs';
import { ApiConfigService } from './api.service';
import { ApiResponse, AuthStatus } from '../models/portfolio.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiConfig = inject(ApiConfigService);

  readonly authState = signal<AuthStatus>({
    authenticated: false,
    username: null,
    role: null
  });

  readonly isAuthenticated = computed(() => this.authState().authenticated);
  readonly currentUsername = computed(() => this.authState().username);

  constructor() {
    this.checkSession().subscribe();
  }

  login(credentials: { username: string; password: string }): Observable<ApiResponse<AuthStatus>> {
    const url = `${this.apiConfig.getBaseUrl()}/auth/login`;
    return this.http.post<ApiResponse<AuthStatus>>(url, credentials).pipe(
      tap(res => {
        if (res.success && res.data) {
          this.authState.set(res.data);
        }
      })
    );
  }

  logout(): Observable<ApiResponse<void>> {
    const url = `${this.apiConfig.getBaseUrl()}/auth/logout`;
    return this.http.post<ApiResponse<void>>(url, {}).pipe(
      tap(() => {
        this.authState.set({ authenticated: false, username: null, role: null });
      }),
      catchError(() => {
        this.authState.set({ authenticated: false, username: null, role: null });
        return of({ success: true, message: 'Logged out locally', data: undefined as any, timestamp: new Date().toISOString() });
      })
    );
  }

  checkSession(): Observable<ApiResponse<AuthStatus>> {
    const url = `${this.apiConfig.getBaseUrl()}/auth/check`;
    return this.http.get<ApiResponse<AuthStatus>>(url).pipe(
      tap(res => {
        if (res.success && res.data) {
          this.authState.set(res.data);
        }
      }),
      catchError(() => {
        this.authState.set({ authenticated: false, username: null, role: null });
        return of({ success: false, message: 'Unauthenticated', data: { authenticated: false, username: null, role: null }, timestamp: new Date().toISOString() });
      })
    );
  }
}
