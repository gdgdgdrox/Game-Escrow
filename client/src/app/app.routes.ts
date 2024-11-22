import { Routes } from '@angular/router';
import { RegistrationComponent } from './component/registration/registration.component';
import { LoginComponent } from './component/login/login.component';
import { TransactionParentComponent } from './component/transaction-parent/transaction-parent.component';
import { HomeComponent } from './component/home/home.component';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'register', component: RegistrationComponent},
    {path: 'login', component: LoginComponent},
    {path: 'transaction-parent', component: TransactionParentComponent},
    {path: 'home', component: HomeComponent}

];
