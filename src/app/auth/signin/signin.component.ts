import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
  });

  username = this.authForm.controls.username as FormControl;
  password = this.authForm.controls.password as FormControl;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  showError(): boolean | ValidationErrors | null {
    const { dirty, touched, errors } = this.authForm;
    return dirty && touched && errors;
  }

  onSubmit(): void {
    if (this.authForm.invalid) {
      return;
    }

    const { password, username } = this.authForm.value;

    // tslint:disable-next-line: deprecation
    this.authService.signIn({ password, username }).subscribe({
      next: () => {
        this.router.navigateByUrl('inbox');
      },
      error: (err) => {
        this.authForm.setErrors({ invalid: true });
      },
    });
  }
}
