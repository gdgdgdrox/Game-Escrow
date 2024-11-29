import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { TransactionService } from '../../service/transaction/transaction.service';
import { TransactionResponseDTO } from '../../dto/transaction-response.dto';
import { HttpErrorResponse } from '@angular/common/http';

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
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
    this.transactionService.getAllTransactionsByUser(
      this.authService.getLoggedInUser()
    ).subscribe(
      {next: (response: TransactionResponseDTO[]) => {
        this.transactions = response;
      },
      error: error => {
        console.error(error);
      }}
    )
  }

  getTransactionDetails(transactionID: string) {
    console.log(`getting transaction for ${transactionID}`);
    this.router.navigate(['/transaction-parent',transactionID])
  //   this.transactionService
  //     .getTransactionByTransactionID(transactionID);
      
  }
}
