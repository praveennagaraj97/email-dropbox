import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatchPassword } from '../validators/match-password';
import { UniqueAsyncValidator } from '../validators/unique-async-validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  authForm = new FormGroup(
    {
      username: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-z0-9]+$/),
        ],
        [this.uniqueUserNameValidator.validate]
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
      passwordConfirmation: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
    },
    { validators: [this.matchPassword.checkPasswordMatch] }
  );

  username = this.authForm.controls.username as FormControl;
  password = this.authForm.controls.password as FormControl;
  passwordConfirmation = this.authForm.controls
    .passwordConfirmation as FormControl;

  constructor(
    private matchPassword: MatchPassword,
    private uniqueUserNameValidator: UniqueAsyncValidator
  ) {}

  ngOnInit(): void {}
  showError(): false | ValidationErrors | null {
    const { dirty, touched, errors } = this.authForm;

    return dirty && touched && errors;
  }
}
