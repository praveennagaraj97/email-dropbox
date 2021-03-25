import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface UsernameAvailableResponse {
  available: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = `https://api.angular-email.com`;
  constructor(private http: HttpClient) {}

  usernameAvailable(username: string): Observable<UsernameAvailableResponse> {
    return this.http.post<UsernameAvailableResponse>(
      this.baseUrl + '/auth/username',
      { username }
    );
  }
}
