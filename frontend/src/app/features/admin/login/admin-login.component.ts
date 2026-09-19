import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 px-4 py-12 transition-colors">
      <div class="max-w-md w-full">
        
        <!-- Header -->
        <div class="text-center mb-8">
          <div class="inline-flex w-12 h-12 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 items-center justify-center font-bold text-lg mb-4 shadow-sm">
            🔒
          </div>
          <h1 class="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Portfolio Administration
          </h1>
          <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Session-based HttpOnly authentication protected by Spring Security
          </p>
        </div>

        <!-- Error Banner -->
        @if (errorMessage()) {
          <div class="mb-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-200 text-xs flex items-center gap-2">
            <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span>{{ errorMessage() }}</span>
          </div>
        }

        <!-- Card -->
        <div class="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <form [formGroup]="loginForm" (ngSubmit)="onLogin()" class="space-y-4">
            
            <div>
              <label for="username" class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Admin Username
              </label>
              <input 
                id="username"
                type="text" 
                formControlName="username"
                placeholder="admin"
                class="w-full px-3.5 py-2 text-sm rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
            </div>

            <div>
              <label for="password" class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Password
              </label>
              <input 
                id="password"
                type="password" 
                formControlName="password"
                placeholder="••••••••••••"
                class="w-full px-3.5 py-2 text-sm rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
            </div>

            <button 
              type="submit" 
              [disabled]="loginForm.invalid || isLoading()"
              class="w-full mt-2 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold text-sm transition-all cursor-pointer flex items-center justify-center gap-2">
              @if (isLoading()) {
                <svg class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
                <span>Authenticating...</span>
              } @else {
                <span>Authenticate Session</span>
              }
            </button>
          </form>

          <div class="mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-800 text-center">
            <a routerLink="/" class="text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">
              ← Return to Public Portfolio
            </a>
          </div>
        </div>

        <!-- Helper Hint -->
        <p class="mt-4 text-center text-[11px] text-neutral-400">
          Default seed credentials: <code class="font-mono text-neutral-600 dark:text-neutral-300">admin / Admin123!&#64;#</code>
        </p>

      </div>
    </div>
  `
})
export class AdminLoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly isLoading = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);

  readonly loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  onLogin(): void {
    if (this.loginForm.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.success && res.data?.authenticated) {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.errorMessage.set(res.message || 'Authentication rejected');
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(err?.error?.message || 'Invalid credentials or backend unreachable.');
      }
    });
  }
}
