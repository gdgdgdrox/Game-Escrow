import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  loginOutcomeMessage!: string;

  onLogin(form: NgForm) {
    console.log('logging in user ', form.value);
    this.authService.login(form.value.username, form.value.password).subscribe({
      next: (response: HttpResponse<string>) => {
        this.loginOutcomeMessage = 'success!';
        setTimeout(() => this.router.navigate(['/header']), 1000);
      },
      error: (error: HttpErrorResponse) => {
        this.loginOutcomeMessage = 'Login failed';
        console.log(error.status, error.message);
      },
    });

  }
}