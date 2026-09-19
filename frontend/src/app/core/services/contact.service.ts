import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfigService } from './api.service';
import { ApiResponse, ContactMessage, ContactRequest } from '../models/portfolio.models';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly http = inject(HttpClient);
  private readonly apiConfig = inject(ApiConfigService);

  submitContact(request: ContactRequest): Observable<ApiResponse<ContactMessage>> {
    const url = `${this.apiConfig.getBaseUrl()}/contact`;
    return this.http.post<ApiResponse<ContactMessage>>(url, request);
  }

  getAllMessages(): Observable<ApiResponse<ContactMessage[]>> {
    const url = `${this.apiConfig.getBaseUrl()}/admin/contact`;
    return this.http.get<ApiResponse<ContactMessage[]>>(url);
  }

  markAsRead(id: number): Observable<ApiResponse<ContactMessage>> {
    const url = `${this.apiConfig.getBaseUrl()}/admin/contact/${id}/read`;
    return this.http.patch<ApiResponse<ContactMessage>>(url, {});
  }

  deleteMessage(id: number): Observable<ApiResponse<void>> {
    const url = `${this.apiConfig.getBaseUrl()}/admin/contact/${id}`;
    return this.http.delete<ApiResponse<void>>(url);
  }
}
