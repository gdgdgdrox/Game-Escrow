import { Component, Input, OnInit } from '@angular/core';
import { TransactionResponseDTO } from '../../../dto/transaction-response.dto';
import { TransactionStep4Service } from '../../../service/transaction/transaction-step4.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TransactionStateService } from '../../../service/transaction-state.service';
import { createUrlTreeFromSnapshot, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-transaction-step4-buyer',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './transaction-step4-buyer.component.html',
  styleUrl: './transaction-step4-buyer.component.css',
})
export class TransactionStep4BuyerComponent implements OnInit {
  @Input() transaction!: TransactionResponseDTO;
  constructor(
    private transactionStep4Service: TransactionStep4Service,
    private transactionStateService: TransactionStateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('step4-buyer init');
  }

  confirmItemReceived(): void {
    console.log('buyer confirmed item received');
    this.transactionStep4Service
      .buyerConfirmItemReceived(this.transaction.transactionID)
      .subscribe({
        next: (transaction: TransactionResponseDTO) => {
          console.log(transaction);
          this.transactionStateService.transaction = transaction;
          console.log('shared service state updated. navigating to parent');
          this.router.navigate([
            '/transaction-parent',
            `step${transaction.currentStep}`,
            transaction.transactionID,
          ]);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }
}
