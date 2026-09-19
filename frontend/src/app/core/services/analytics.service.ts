import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfigService } from './api.service';
import { ApiResponse, AnalyticsSummary, PageViewRequest } from '../models/portfolio.models';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private readonly http = inject(HttpClient);
  private readonly apiConfig = inject(ApiConfigService);

  trackPageView(request: PageViewRequest): Observable<ApiResponse<void>> {
    const url = `${this.apiConfig.getBaseUrl()}/analytics/track`;
    return this.http.post<ApiResponse<void>>(url, request);
  }

  getSummary(): Observable<ApiResponse<AnalyticsSummary>> {
    const url = `${this.apiConfig.getBaseUrl()}/admin/analytics/summary`;
    return this.http.get<ApiResponse<AnalyticsSummary>>(url);
  }
}
