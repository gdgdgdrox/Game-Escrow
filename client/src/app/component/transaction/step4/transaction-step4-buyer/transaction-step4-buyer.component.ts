import { Component, Input, OnInit } from '@angular/core';
import { TransactionResponseDTO } from '../../../../dto/transaction-response.dto';
import { TransactionStep4Service } from '../../../../service/transaction/transaction-step4.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TransactionStateService } from '../../../../service/transaction-state.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction-step4-buyer',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './transaction-step4-buyer.component.html',
  styleUrl: './transaction-step4-buyer.component.css',
})
export class TransactionStep4BuyerComponent {
  @Input() transaction!: TransactionResponseDTO;
  itemReceived = false;
  itemReceivedStatusMessage = '';

  constructor(
    private transactionStep4Service: TransactionStep4Service,
    private transactionStateService: TransactionStateService,
    private router: Router
  ) {}

  confirmItemReceived(): void {
    this.transactionStep4Service
      .buyerConfirmItemReceived(this.transaction.transactionID)
      .subscribe({
        next: (transaction: TransactionResponseDTO) => {
          this.transactionStateService.transaction = transaction;
          console.log('shared service state updated. navigating to parent');
          this.router.navigate([
            '/transaction',
            `step${transaction.currentStep}`,
            transaction.transactionID,
          ]);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
          this.itemReceivedStatusMessage = 'Something went wrong. Please try again later.';
        },
      });
  }
}
