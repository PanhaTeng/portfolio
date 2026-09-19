import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {
  // In development, Spring Boot may run on localhost:8080 or behind a reverse proxy /api/v1
  private readonly baseUrl = (window as any).__BACKEND_URL__ || '/api/v1';

  getBaseUrl(): string {
    return this.baseUrl;
  }
}
