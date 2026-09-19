import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  readonly isDark = signal<boolean>(false);

  constructor() {
    // Check initial preference from localStorage or OS media query
    const saved = localStorage.getItem('portfolio_theme');
    if (saved) {
      this.isDark.set(saved === 'dark');
    } else {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.isDark.set(prefersDark);
    }

    // Reactively synchronize the 'dark' CSS class on document.documentElement
    effect(() => {
      const dark = this.isDark();
      if (dark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('portfolio_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('portfolio_theme', 'light');
      }
    });
  }

  toggleTheme(): void {
    this.isDark.update(current => !current);
  }
}
