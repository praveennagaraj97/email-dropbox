import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { EmailService, EmailBodyResponse } from '../email.service';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css'],
})
export class EmailShowComponent implements OnInit {
  emailBody!: EmailBodyResponse;
  loading$ = new BehaviorSubject<boolean>(true);

  constructor(
    private route: ActivatedRoute,
    private emailService: EmailService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        tap(() => this.loading$.next(true)),
        switchMap(({ id }) => {
          return this.emailService.getEmail(id);
        })
      )
      .subscribe({
        next: (email) => {
          this.loading$.next(false);
          this.emailBody = email;
        },
      });
  }
}
