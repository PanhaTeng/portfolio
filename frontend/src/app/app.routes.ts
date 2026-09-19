import { Routes } from '@angular/router';
import { PortfolioPageComponent } from './features/public/portfolio-page.component';
import { AdminLoginComponent } from './features/admin/login/admin-login.component';
import { AdminDashboardComponent } from './features/admin/dashboard/admin-dashboard.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: PortfolioPageComponent,
    title: 'Panha Teng – Systems & Full-Stack Engineer'
  },
  {
    path: 'admin/login',
    component: AdminLoginComponent,
    title: 'Admin Authentication – Portfolio'
  },
  {
    path: 'admin/dashboard',
    component: AdminDashboardComponent,
    canActivate: [authGuard],
    title: 'Admin Dashboard – Portfolio'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
