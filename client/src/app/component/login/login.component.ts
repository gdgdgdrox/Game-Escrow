import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, MatInputModule, MatButtonModule, MatFormFieldModule, MatRadioModule, MatIconModule,MatCardModule, CommonModule, MatProgressSpinnerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}
  isLoggingIn = false;
  loginOutcomeMessage!: string;
  loginSuccess = false;

  onLogin(form: NgForm) {
    this.isLoggingIn = true;
    this.authService.login(form.value.username, form.value.password).subscribe({
      next: (response: HttpResponse<string>) => {
        setTimeout(() => {
          this.isLoggingIn = false;
          this.router.navigate(['']);
        }, 1000);
      },
      error: (error: HttpErrorResponse) => {
        this.isLoggingIn = false;
        this.loginOutcomeMessage = 'Login failed';
        console.log(error.status, error.message);
      },
    });

  }
}