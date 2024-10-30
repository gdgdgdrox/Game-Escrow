import { Routes } from '@angular/router';
import { RegistrationComponent } from './component/registration/registration.component';

export const routes: Routes = [
    {path: '', component: RegistrationComponent},
    {path: 'register', component: RegistrationComponent}

];
