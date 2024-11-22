import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatStepperModule } from '@angular/material/stepper';
import { TransactionStep1Component } from './transaction-step1/transaction-step1.component';
import { TransactionStep2Component } from './transaction-step2/transaction-step2.component';
import { TransactionStep3Component } from './transaction-step3/transaction-step3.component';
import { TransactionStep4Component } from './transaction-step4/transaction-step4.component';
import { TransactionStep5Component } from './transaction-step5/transaction-step5.component';

@Component({
  selector: 'app-transaction-parent',
  standalone: true,
  imports: [
    RouterModule,
    MatStepperModule,
    TransactionStep1Component,
    TransactionStep2Component,
    TransactionStep3Component,
    TransactionStep4Component,
    TransactionStep5Component
  ],
  templateUrl: './transaction-parent.component.html',
  styleUrl: './transaction-parent.component.css',
})
export class TransactionParentComponent {}
