import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PORTFOLIO_INFO } from '../../../../core/data/portfolio-data';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="about" class="py-16 border-t border-neutral-200 dark:border-neutral-800">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        <!-- Left: Bio and Philosophy -->
        <div class="lg:col-span-7 space-y-4">
          <h2 class="text-xs uppercase font-mono tracking-widest text-blue-600 dark:text-blue-400 font-semibold">
            Engineering Philosophy
          </h2>
          <h3 class="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Pragmatic Enterprise Architecture Without Artificial Complexity
          </h3>
          <p class="text-neutral-600 dark:text-neutral-300 leading-relaxed text-base">
            I specialize in crafting high-reliability web platforms by applying banking-grade software discipline to modern web stacks. Rather than over-engineering premature distributed microservices, I advocate for cohesive <strong>modular monoliths</strong>: distinct domain modules with rigid interface boundaries, dependency inversion, and clear bounded contexts.
          </p>
          <p class="text-neutral-600 dark:text-neutral-300 leading-relaxed text-base">
            On the frontend, I leverage Angular standalone components with modern reactive Signals and Tailwind CSS to deliver fast, accessible, and beautifully composed user interfaces with zero unnecessary dependencies.
          </p>

          <div class="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div class="p-3.5 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <span class="block text-xs font-mono text-neutral-500">Pattern</span>
              <span class="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Modular Monolith</span>
            </div>
            <div class="p-3.5 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <span class="block text-xs font-mono text-neutral-500">Security</span>
              <span class="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Session HttpOnly</span>
            </div>
            <div class="p-3.5 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 col-span-2 sm:col-span-1">
              <span class="block text-xs font-mono text-neutral-500">Persistence</span>
              <span class="text-sm font-semibold text-neutral-900 dark:text-neutral-100">SQLite + JPA</span>
            </div>
          </div>
        </div>

        <!-- Right: Stats Grid -->
        <div class="lg:col-span-5 grid grid-cols-2 gap-4">
          @for (stat of info.stats; track stat.label) {
            <div class="p-5 rounded-xl bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between">
              <span class="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-neutral-50 tracking-tight font-mono">
                {{ stat.value }}
              </span>
              <span class="mt-2 text-xs font-medium text-neutral-500 dark:text-neutral-400">
                {{ stat.label }}
              </span>
            </div>
          }
        </div>

      </div>
    </section>
  `
})
export class AboutComponent {
  readonly info = PORTFOLIO_INFO;
}
