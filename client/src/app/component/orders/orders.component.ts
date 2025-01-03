import { AuthService } from '../../service/auth.service';
import { Router, RouterModule } from '@angular/router';
import { TransactionSharedService } from '../../service/transaction/transaction-shared.service';
import { TransactionResponseDTO } from '../../dto/transaction-response.dto';
import { TransactionStateService } from '../../service/transaction-state.service';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {MatBadgeModule} from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { finalize } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [MatTabsModule,MatListModule, RouterModule, DatePipe, CommonModule, MatBadgeModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  loggedInUser: string | null = null;
  transactions: TransactionResponseDTO[] = [];
  transactionsPendingUserAction: TransactionResponseDTO[] = [];
  transactionsCompleted: TransactionResponseDTO[] = [];
  isRetrievingTransaction = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private transactionSharedService: TransactionSharedService,
    private transactionStateService: TransactionStateService,

  ) {}

  ngOnInit(): void {
    this.isRetrievingTransaction = true;
    this.loggedInUser = this.authService.getLoggedInUsername();
    this.transactionSharedService.getAllTransactionsByUser(this.loggedInUser!)
    .pipe(finalize(()=>this.isRetrievingTransaction=false))
    .subscribe(
      {next: (response: TransactionResponseDTO[]) => {
        this.transactions = response.sort((a, b) => {
          return new Date(b.transactionSteps.transactionStep1.createdDate).getTime() - new Date(a.transactionSteps.transactionStep1.createdDate).getTime();
        });;
        this.arrangeTransactionsBasedOnStatus();
      },
      error: error => {
        console.error(error);
      }}
    );
  }

  arrangeTransactionsBasedOnStatus(){
    const currentLoggedInUser = this.authService.getLoggedInUsername();
    this.transactionsPendingUserAction = this.transactions.filter(transaction => {
      return (
        // pending user to review and accept trade
        (transaction.currentStep === 2 && transaction.counterparty === currentLoggedInUser) 
      ||
        // pending user to pay escrow
        (transaction.currentStep === 3 && transaction.buyer === currentLoggedInUser)
      ||
        // pending user to confirm user received game item
        (transaction.currentStep === 4 && transaction.buyer === currentLoggedInUser)
      ) 
    })
    // sort by which transaction was the first to be created
    .sort((a, b) => {
      return new Date(b.transactionSteps.transactionStep1.createdDate).getTime() - new Date(a.transactionSteps.transactionStep1.createdDate).getTime();
    });

    this.transactionsCompleted = this.transactions.filter(transaction => transaction.currentStep === 5)
     .sort((a:TransactionResponseDTO, b:TransactionResponseDTO) => {
      return new Date(b.transactionSteps.transactionStep4.completedDate).getTime() - new Date(a.transactionSteps.transactionStep4.completedDate).getTime();
    });
  }

  getTransactionDetails(transactionID: string) {
    const transaction = this.transactions.find(transaction => transaction.transactionID === transactionID);
    if (transaction){
      this.transactionStateService.transaction = transaction;
      console.log('shared service state updated. navigating to parent');
      this.router.navigate(['/transaction',`step${transaction.currentStep}`,transactionID])
    }

  }
}
