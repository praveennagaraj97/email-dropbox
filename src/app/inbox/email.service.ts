import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface EmailResponse {
  id: string;
  subject: string;
  from: string;
}

export interface EmailBodyResponse extends EmailResponse {
  text: string;
  to: string;
  html: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private baseUrl = `https://api.angular-email.com`;

  constructor(private http: HttpClient) {}

  getEmails(): Observable<EmailResponse[]> {
    return this.http.get<EmailResponse[]>(`${this.baseUrl}/emails`);
  }

  getEmail(id: string): Observable<EmailBodyResponse> {
    return this.http.get<EmailBodyResponse>(`${this.baseUrl}/emails/${id}`);
  }
}
