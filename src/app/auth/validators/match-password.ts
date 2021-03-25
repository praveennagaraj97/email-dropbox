import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * @OverallCustomFormValidator
 */

@Injectable({
  providedIn: 'root',
})
export class MatchPassword {
  get checkPasswordMatch(): ValidatorFn {
    return (formControl: AbstractControl): ValidationErrors | null => {
      const { password, passwordConfirmation } = formControl.value;
      if (password === passwordConfirmation) {
        return null;
      }
      return { passwordDontMatch: true };
    };
  }
}
