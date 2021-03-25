import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator } from '@angular/forms';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class UniqueAsyncValidator implements AsyncValidator {
  constructor(private authService: AuthService) {}

  validate = (formControl: AbstractControl): any => {
    const username: string = formControl.value;

    return this.authService.usernameAvailable(username).pipe(
      map(() => null),
      catchError(() => of({ userNameTaken: true }))
    );
  };
}
