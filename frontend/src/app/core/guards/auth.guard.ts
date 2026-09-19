import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // If already authenticated via local signal
  if (authService.isAuthenticated()) {
    return true;
  }

  // Otherwise, verify session against Spring Boot backend
  return authService.checkSession().pipe(
    map(res => {
      if (res.success && res.data?.authenticated) {
        return true;
      }
      router.navigate(['/admin/login']);
      return false;
    })
  );
};
