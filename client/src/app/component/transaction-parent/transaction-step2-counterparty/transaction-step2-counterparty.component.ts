import { Component, Input, OnInit } from '@angular/core';
import { TransactionService } from '../../../service/transaction/transaction.service';
import { TransactionResponseDTO } from '../../../dto/transaction-response.dto';
import { TransactionStep2Service } from '../../../service/transaction/transaction-step2.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-transaction-step2-counterparty',
  standalone: true,
  imports: [],
  templateUrl: './transaction-step2-counterparty.component.html',
  styleUrl: './transaction-step2-counterparty.component.css',
})
export class TransactionStep2CounterpartyComponent {
  @Input()
  transaction!: TransactionResponseDTO
  constructor(private transactionStep2Service: TransactionStep2Service) {}

  acceptTrade(){
    this.transactionStep2Service.acceptTrade(this.transaction.transactionID).subscribe({
      next: response => {
        console.log('response received');
        console.log(response);
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      }
    })
  }

}
