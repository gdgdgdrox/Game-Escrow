import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { User } from '../../model/user';
import { RegistrationService } from '../../service/registration.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule, MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatRadioModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  registrationForm!: FormGroup;
  registrationStatusMessage = '';
  registrationStatusClass = '';


  constructor(
    private registrationService: RegistrationService,
    private router: Router
  ){
    // initialize form
    this.registrationForm = new FormGroup({
      firstName: new FormControl<string>(''),
      lastName:  new FormControl<string>('',[Validators.required]),
      username: new FormControl<string>('',[Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
      email: new FormControl<string>('',[Validators.required,Validators.email]),
      password: new FormControl<string>('',[Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
      sex: new FormControl<string>('male',[Validators.required])
    })
  }

  processRegistration(): void{
    console.log('form submitted');
    console.log(this.registrationForm.value);
    const user = this.registrationForm.value as User;
    this.registrationService.createUser(user).subscribe({
      next: (response: HttpResponse<string>) => {
        console.log('response from registration endpoint received');
        console.log(response.status);
        if (response.status === 201){
          this.registrationStatusMessage = 'Success!';
          this.registrationStatusClass = 'success';
          setTimeout(() => this.router.navigate(['/login']), 2000
        )
        }
      },
      error: (error: HttpErrorResponse) => {
        console.log('error with registration');
        console.log(error.message);
        if (error.status === 409){
          this.registrationStatusMessage = 'User already exists';          
        }
        else{
          this.registrationStatusMessage = 'Something went wrong. Please try again later.';
        }
        this.registrationStatusClass = 'error';
      }
    });

  }

  // passwordValidator(control: AbstractControl): ValidationErrors | null {
  //   const value = control.value || '';
  //   const hasUpperCase = /[A-Z]/.test(value);
  //   const hasNumber = /\d/.test(value);
  //   const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

  //   if (hasUpperCase && hasNumber && hasSpecialChar) {
  //     return null;
  //   }
  //   return {
  //     passwordStrength: 'Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character.',
  //   };
  // }


}
