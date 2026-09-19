import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ContactComponent } from './components/contact/contact.component';
import { AnalyticsService } from '../../core/services/analytics.service';

@Component({
  selector: 'app-portfolio-page',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    ExperienceComponent,
    ContactComponent
  ],
  template: `
    <div class="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors">
      <app-navbar></app-navbar>

      <main class="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6">
        <app-hero></app-hero>
        <app-about></app-about>
        <app-skills></app-skills>
        <app-projects></app-projects>
        <app-experience></app-experience>
        <app-contact></app-contact>
      </main>

      <app-footer></app-footer>
    </div>
  `
})
export class PortfolioPageComponent implements OnInit {
  private readonly analyticsService = inject(AnalyticsService);

  ngOnInit(): void {
    // Record page view telemetry on Spring Boot backend
    this.analyticsService.trackPageView({
      pagePath: '/',
      referrer: document.referrer || undefined
    }).subscribe({
      error: () => {
        // Silently tolerate if backend is offline during client-only inspection
      }
    });
  }
}
