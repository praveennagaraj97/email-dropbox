import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  signedIn$!: BehaviorSubject<boolean>;

  constructor(private authService: AuthService) {
    this.signedIn$ = this.authService.signedIn$;
  }

  ngOnInit(): void {
    // tslint:disable-next-line: deprecation
    this.authService.checkIsSigned().subscribe();
  }

  handleLogout(event: Event): void {
    event.preventDefault();
    // tslint:disable-next-line: deprecation
    this.authService.signOut().subscribe();
  }
}
