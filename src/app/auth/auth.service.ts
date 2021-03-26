import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface UsernameAvailableResponse {
  available: boolean;
}

interface FormValuesInputPayload {
  password: string;
  passwordConfirmation: string;
  username: string;
}

interface SignUpRespose {
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = `https://api.angular-email.com`;
  constructor(private http: HttpClient) {}

  signedIn$ = new BehaviorSubject<boolean>(false);

  usernameAvailable(username: string): Observable<UsernameAvailableResponse> {
    return this.http.post<UsernameAvailableResponse>(
      this.baseUrl + '/auth/username',
      { username }
    );
  }

  userSignUp(formValues: FormValuesInputPayload): Observable<SignUpRespose> {
    return this.http
      .post<SignUpRespose>(this.baseUrl + `/auth/signup`, formValues)
      .pipe(
        tap(() => {
          this.signedIn$.next(true);
        })
      );
  }

  checkIsSigned(): Observable<any> {
    return this.http
      .get<{ authenticated: boolean }>(this.baseUrl + `/auth/signedin`)
      .pipe(
        tap(({ authenticated }) => {
          if (authenticated) {
            this.signedIn$.next(true);
          }
        })
      );
  }

  signOut(): Observable<any> {
    return this.http
      .post<any>(this.baseUrl + `/auth/signout`, {})
      .pipe(tap(() => this.signedIn$.next(false)));
  }
}
