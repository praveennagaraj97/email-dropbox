import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface EmailResponse {
  id: string;
  subject: string;
  from: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private baseUrl = `https://api.angular-email.com`;

  constructor(private http: HttpClient) {}

  getEmails(): Observable<EmailResponse[]> {
    return this.http
      .get<EmailResponse[]>(`${this.baseUrl}/emails`)
      .pipe(tap((x) => console.log(x)));
  }
}