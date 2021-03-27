import { Component, OnInit } from '@angular/core';
import { EmailService, EmailResponse } from '../email.service';

@Component({
  selector: 'app-email-index',
  templateUrl: './email-index.component.html',
  styleUrls: ['./email-index.component.css'],
})
export class EmailIndexComponent implements OnInit {
  emailsList!: EmailResponse[];

  constructor(private emailService: EmailService) {}

  ngOnInit(): void {
    // tslint:disable-next-line: deprecation
    this.emailService.getEmails().subscribe({
      next: (emails) => {
        this.emailsList = emails;
      },
    });
  }
}
