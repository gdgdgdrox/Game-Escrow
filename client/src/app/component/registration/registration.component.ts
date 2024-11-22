import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../model/user';
import { RegistrationService } from '../../service/registration.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  registrationForm!: FormGroup;

  constructor(
    private registrationService: RegistrationService,
    private router: Router
  ){
    // initialize form
    this.registrationForm = new FormGroup({
      username: new FormControl<string>('',[Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
      email: new FormControl<string>('',[Validators.required,Validators.email]),
      password: new FormControl<string>('',[Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
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
        this.router.navigate(['/login']);
      },
      error: (error: HttpErrorResponse) => {
        console.log('error with registration');
        console.log(error.message);
      }
    });

  }


}
