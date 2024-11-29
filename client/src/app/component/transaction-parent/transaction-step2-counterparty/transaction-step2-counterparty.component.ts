import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TransactionResponseDTO } from '../../../dto/transaction-response.dto';
import { TransactionStep2Service } from '../../../service/transaction/transaction-step2.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-step2-counterparty',
  standalone: true,
  imports: [],
  templateUrl: './transaction-step2-counterparty.component.html',
  styleUrl: './transaction-step2-counterparty.component.css',
})
export class TransactionStep2CounterpartyComponent implements OnInit{
  @Input() transaction!: TransactionResponseDTO
  @Input() stepper!: MatStepper;
  @Output() onTradeAccepted = new EventEmitter<TransactionResponseDTO>();

  constructor(private transactionStep2Service: TransactionStep2Service, private router: Router) {}

  ngOnInit(): void {
    console.log('step 2 counterparty init');
  }

  acceptTrade(){
    this.transactionStep2Service.acceptTrade(this.transaction.transactionID).subscribe({
      next: (response:TransactionResponseDTO) => {
        this.onTradeAccepted.emit(response);
        this.stepper.next();
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      }
    })
  }

}
