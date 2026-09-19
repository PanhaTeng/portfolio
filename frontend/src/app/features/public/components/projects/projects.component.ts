import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PROJECTS } from '../../../../core/data/portfolio-data';
import { Project } from '../../../../core/models/portfolio.models';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="projects" class="py-16 border-t border-neutral-200 dark:border-neutral-800">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h2 class="text-xs uppercase font-mono tracking-widest text-blue-600 dark:text-blue-400 font-semibold">
            Featured Projects
          </h2>
          <h3 class="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mt-1">
            Engineered Systems &amp; Open Source
          </h3>
        </div>

        <!-- Filter Tags -->
        <div class="flex flex-wrap gap-1.5 p-1 bg-neutral-100 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 text-xs">
          @for (cat of categories; track cat) {
            <button
              type="button"
              (click)="selectedCategory.set(cat)"
              [class.bg-white]="selectedCategory() === cat"
              [class.dark:bg-neutral-800]="selectedCategory() === cat"
              [class.text-neutral-900]="selectedCategory() === cat"
              [class.dark:text-white]="selectedCategory() === cat"
              [class.shadow-sm]="selectedCategory() === cat"
              class="px-3 py-1.5 rounded-md font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-all cursor-pointer">
              {{ cat }}
            </button>
          }
        </div>
      </div>

      <!-- Project Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        @for (project of filteredProjects(); track project.id) {
          <div class="p-6 rounded-xl bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
            
            <div>
              <div class="flex items-center justify-between gap-3 mb-2">
                <span class="text-xs font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                  {{ project.category }}
                </span>
                @if (project.featured) {
                  <span class="text-[11px] font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                    ★ Featured
                  </span>
                }
              </div>

              <h4 class="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                {{ project.title }}
              </h4>
              <p class="text-xs font-medium text-blue-600 dark:text-blue-400 mt-0.5">
                {{ project.tagline }}
              </p>

              <p class="text-sm text-neutral-600 dark:text-neutral-400 mt-3 leading-relaxed">
                {{ project.description }}
              </p>

              @if (project.metrics) {
                <div class="mt-3 px-3 py-1.5 rounded-md bg-neutral-50 dark:bg-neutral-950 text-xs font-mono text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800">
                  ⚡ {{ project.metrics }}
                </div>
              }
            </div>

            <div class="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-col gap-3">
              <!-- Tags -->
              <div class="flex flex-wrap gap-1.5">
                @for (tag of project.tags; track tag) {
                  <span class="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-400">
                    {{ tag }}
                  </span>
                }
              </div>

              <!-- Action Links -->
              <div class="flex items-center gap-4 text-xs font-semibold pt-1">
                <a 
                  [href]="project.githubUrl" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="text-neutral-900 dark:text-neutral-100 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1.5 transition-colors">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                  Source Code
                </a>
              </div>
            </div>

          </div>
        }
      </div>
    </section>
  `
})
export class ProjectsComponent {
  readonly categories = ['All', 'Enterprise', 'Systems', 'Web & Cloud'];
  readonly selectedCategory = signal<string>('All');

  readonly filteredProjects = computed(() => {
    const cat = this.selectedCategory();
    if (cat === 'All') return PROJECTS;
    return PROJECTS.filter(p => p.category === cat);
  });
}
