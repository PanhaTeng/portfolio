import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PORTFOLIO_INFO } from '../../../../core/data/portfolio-data';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="hero" class="pt-12 sm:pt-20 pb-16">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900/60 mb-6">
        <span class="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-ping"></span>
        Available for Lead Systems &amp; Full-Stack Roles
      </div>

      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 max-w-4xl leading-[1.15]">
        {{ info.title }}
      </h1>

      <p class="mt-6 text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl leading-relaxed">
        {{ info.tagline }}
      </p>

      <p class="mt-4 text-base text-neutral-500 dark:text-neutral-400 max-w-2xl">
        {{ info.bio }}
      </p>

      <!-- Action Buttons -->
      <div class="mt-8 flex flex-wrap items-center gap-4">
        <a href="#projects" class="px-5 py-2.5 rounded-lg bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-950 font-medium text-sm hover:opacity-90 transition-opacity">
          View Selected Work
        </a>
        <a href="#contact" class="px-5 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 font-medium text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors">
          Get in Touch
        </a>
        <a [href]="info.github" target="_blank" rel="noopener noreferrer" class="px-4 py-2.5 rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white text-sm font-medium transition-colors flex items-center gap-1.5">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
          GitHub Profile
        </a>
      </div>
    </section>
  `
})
export class HeroComponent {
  readonly info = PORTFOLIO_INFO;
}
