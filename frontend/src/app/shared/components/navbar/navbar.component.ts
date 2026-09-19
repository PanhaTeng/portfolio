import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../../core/services/theme.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-neutral-950/80 border-b border-neutral-200/80 dark:border-neutral-800/80 transition-colors">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        <!-- Brand / Identity -->
        <a routerLink="/" class="flex items-center gap-2.5 font-bold tracking-tight text-neutral-900 dark:text-neutral-100 group">
          <div class="w-8 h-8 rounded-lg bg-blue-600 dark:bg-blue-500 text-white flex items-center justify-center text-sm font-black shadow-sm group-hover:scale-105 transition-transform">
            PT
          </div>
          <span class="text-base font-semibold">Panha Teng</span>
          <span class="hidden sm:inline-block text-xs px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-mono">
            Modular Monolith
          </span>
        </a>

        <!-- Desktop Navigation Links -->
        <nav class="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-600 dark:text-neutral-400">
          <a href="#about" class="hover:text-neutral-900 dark:hover:text-white transition-colors">About</a>
          <a href="#skills" class="hover:text-neutral-900 dark:hover:text-white transition-colors">Skills</a>
          <a href="#projects" class="hover:text-neutral-900 dark:hover:text-white transition-colors">Projects</a>
          <a href="#experience" class="hover:text-neutral-900 dark:hover:text-white transition-colors">Experience</a>
          <a href="#contact" class="hover:text-neutral-900 dark:hover:text-white transition-colors">Contact</a>
        </nav>

        <!-- Right Controls: Theme Toggle & Admin Link -->
        <div class="flex items-center gap-3">
          <!-- Theme Switcher -->
          <button 
            type="button"
            (click)="themeService.toggleTheme()" 
            [attr.aria-label]="themeService.isDark() ? 'Switch to light mode' : 'Switch to dark mode'"
            class="p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            title="Toggle theme">
            @if (themeService.isDark()) {
              <!-- Sun Icon -->
              <svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41m14.14-14.14l-1.41 1.41"></path>
              </svg>
            } @else {
              <!-- Moon Icon -->
              <svg class="w-5 h-5 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              </svg>
            }
          </button>

          <!-- Admin Portal Link -->
          @if (authService.isAuthenticated()) {
            <a routerLink="/admin/dashboard" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800/80 hover:bg-emerald-200 transition-colors">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Admin Portal
            </a>
          } @else {
            <a routerLink="/admin/login" class="px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 transition-colors">
              Admin Login
            </a>
          }
        </div>

      </div>
    </header>
  `
})
export class NavbarComponent {
  readonly themeService = inject(ThemeService);
  readonly authService = inject(AuthService);
}
