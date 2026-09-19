import { HttpInterceptorFn } from '@angular/common/http';

/**
 * Functional HTTP Interceptor for Angular HttpClient.
 * Automatically attaches `withCredentials: true` to all outgoing HTTP requests,
 * guaranteeing browser inclusion of HttpOnly Spring Security session cookies.
 */
export const credentialsInterceptor: HttpInterceptorFn = (req, next) => {
  const cloned = req.clone({
    withCredentials: true
  });
  return next(cloned);
};
