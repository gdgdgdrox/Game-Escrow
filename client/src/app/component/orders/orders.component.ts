import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { TransactionSharedService } from '../../service/transaction/transaction-shared.service';
import { TransactionResponseDTO } from '../../dto/transaction-response.dto';
import { HttpErrorResponse } from '@angular/common/http';
import { TransactionStateService } from '../../service/transaction-state.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  transactions: TransactionResponseDTO[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private transactionSharedService: TransactionSharedService,
    private transactionStateService: TransactionStateService
  ) {}

  ngOnInit(): void {
    // if (!this.authService.isLoggedIn()) {
    //   this.router.navigate(['/login']);
    // }
    // this.transactionSharedService.getAllTransactionsByUser(
    //   this.authService.getLoggedInUser()
    // ).subscribe(
    //   {next: (response: TransactionResponseDTO[]) => {
    //     this.transactions = response;
    //   },
    //   error: error => {
    //     console.error(error);
    //   }}
    // )
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
