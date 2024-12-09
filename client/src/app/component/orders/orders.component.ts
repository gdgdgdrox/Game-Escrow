import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router, RouterModule } from '@angular/router';
import { TransactionSharedService } from '../../service/transaction/transaction-shared.service';
import { TransactionResponseDTO } from '../../dto/transaction-response.dto';
import { TransactionStateService } from '../../service/transaction-state.service';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';



@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [MatTabsModule,MatListModule, RouterModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  loggedInUser: string | null = null;
  transactions: TransactionResponseDTO[] = [];
  transactionsPendingUserAction: TransactionResponseDTO[] = [];
  // transactionsPendingUserPayment: TransactionResponseDTO[] = [];
  transactionsCompleted: TransactionResponseDTO[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private transactionSharedService: TransactionSharedService,
    private transactionStateService: TransactionStateService,
  ) {}

  ngOnInit(): void {
    console.log('init');
    this.loggedInUser = this.authService.getLoggedInUsername();
    this.transactionSharedService.getAllTransactionsByUser(this.loggedInUser!)
    .subscribe(
      {next: (response: TransactionResponseDTO[]) => {
        this.transactions = response;
        this.arrangeTransactionsBasedOnStatus();
      },
      error: error => {
        console.error(error);
      }}
    );
  }

  arrangeTransactionsBasedOnStatus(){
    console.log(`transaction size: ${this.transactions.length}`);
    const currentLoggedInUser = this.authService.getLoggedInUsername();
    console.log(`current logged in user is = ${currentLoggedInUser}`);
    this.transactions.forEach(txn => {
      if (txn.currentStep===2){
        console.log(`step 2 - ${txn.transactionID}`);
        if (txn.counterparty === currentLoggedInUser){
          console.log(`step 2 AND user is counterparty - ${txn.transactionID}`);
        }
      }
    })
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
    console.log(this.transactionsPendingUserAction.length);

    this.transactionsCompleted = this.transactions.filter(transaction => transaction.currentStep === 5);
  }

  getTransactionDetails(transactionID: string) {
    const transaction = this.transactions.find(transaction => transaction.transactionID === transactionID);
    console.log(`user is trying to load ${transaction?.transactionID}`);
    if (transaction){
      this.transactionStateService.transaction = transaction;
      console.log('shared service state updated. navigating to parent');
      this.router.navigate(['/transaction-parent',`step${transaction.currentStep}`,transactionID])
    }

  }
}
