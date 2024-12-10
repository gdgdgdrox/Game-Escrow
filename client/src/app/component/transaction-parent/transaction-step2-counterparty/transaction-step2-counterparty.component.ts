import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TransactionResponseDTO } from '../../../dto/transaction-response.dto';
import { TransactionStep2Service } from '../../../service/transaction/transaction-step2.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { TransactionStateService } from '../../../service/transaction-state.service';

@Component({
  selector: 'app-transaction-step2-counterparty',
  standalone: true,
  imports: [],
  templateUrl: './transaction-step2-counterparty.component.html',
  styleUrl: './transaction-step2-counterparty.component.css',
})
export class TransactionStep2CounterpartyComponent implements OnInit {
  @Input() transaction!: TransactionResponseDTO;

  constructor(
    private transactionStep2Service: TransactionStep2Service,
    private router: Router,
    private transactionStateService: TransactionStateService
  ) {}

  ngOnInit(): void {
    console.log('step 2 counterparty init');
  }

  acceptTrade() {
    console.log('counterparty has accepted trade');
    this.transactionStep2Service
      .acceptTrade(this.transaction.transactionID)
      .subscribe({
        next: (transaction: TransactionResponseDTO) => {
          console.log(`transaction step 2 status updated to ${transaction.transactionSteps.transactionStep2.status}`);
          console.log(`current step is now ${transaction.currentStep}`);
          this.transactionStateService.transaction = transaction;
          console.log('shared service state updated. navigating to parent');
          this.router.navigate(['/transaction-parent',`step${transaction.currentStep}`,transaction.transactionID]);
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
        },
      });
  }
}
