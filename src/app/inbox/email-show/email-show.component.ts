import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailService, EmailBodyResponse } from '../email.service';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css'],
})
export class EmailShowComponent implements OnInit {
  emailBody!: EmailBodyResponse;

  constructor(
    private route: ActivatedRoute,
    private emailService: EmailService
  ) {}

  ngOnInit(): void {
    // tslint:disable-next-line: deprecation
    this.route.params.subscribe(({ id }) => {
      // tslint:disable-next-line: deprecation
      this.emailService.getEmail(id).subscribe({
        next: (email) => {
          console.log(email);
        },
      });
    });
  }
}
