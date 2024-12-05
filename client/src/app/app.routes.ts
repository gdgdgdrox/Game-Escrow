import { Routes } from '@angular/router';
import { RegistrationComponent } from './component/registration/registration.component';
import { LoginComponent } from './component/login/login.component';
import { TransactionParentComponent } from './component/transaction-parent/transaction-parent.component';
import { HeaderComponent } from './component/header/header.component';
import { OrdersComponent } from './component/orders/orders.component';
import { HomeComponent } from './component/home/home.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'register', component: RegistrationComponent},
    {path: 'login', component: LoginComponent},
    {path: 'transaction-parent', component: TransactionParentComponent},
    {path: 'transaction-parent/step2', component: TransactionParentComponent},
    {path: 'transaction-parent/step2/:transactionID', component: TransactionParentComponent},
    {path: 'transaction-parent/step3', component: TransactionParentComponent},
    {path: 'transaction-parent/step3/:transactionID', component: TransactionParentComponent},
    {path: 'transaction-parent/step4', component: TransactionParentComponent},
    {path: 'transaction-parent/step4/:transactionID', component: TransactionParentComponent},
    {path: 'transaction-parent/step5/:transactionID', component: TransactionParentComponent},
    {path: 'transaction-parent/:transactionID', component: TransactionParentComponent},
    {path: 'header', component: HeaderComponent},
    {path: 'orders', component: OrdersComponent}

];
