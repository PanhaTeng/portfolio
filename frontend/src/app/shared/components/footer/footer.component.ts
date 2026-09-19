import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="mt-24 border-t border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 py-12 transition-colors">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-neutral-500 dark:text-neutral-400">
        <div>
          <p>© {{ currentYear }} Panha Teng. Engineered with Angular 18 &amp; Spring Boot 3 Modular Monolith.</p>
          <p class="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
            Zero external tracking · SQLite Embedded Persistence · HttpOnly Session Security
          </p>
        </div>
        <div class="flex items-center gap-6">
          <a href="https://github.com/tengpanha" target="_blank" rel="noopener noreferrer" class="hover:text-neutral-900 dark:hover:text-white transition-colors">
            GitHub
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="hover:text-neutral-900 dark:hover:text-white transition-colors">
            LinkedIn
          </a>
          <a href="#hero" class="hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-1">
            Back to Top
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="m18 15-6-6-6 6"/></svg>
          </a>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  readonly currentYear = new Date().getFullYear();
}
