import { Component, OnInit } from '@angular/core';
import { TransactionResponseDTO } from '../../../../dto/transaction-response.dto';
import { MatButtonModule } from '@angular/material/button';
import { TransactionSharedService } from '../../../../service/transaction/transaction-shared.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-transaction-step5-seller',
  standalone: true,
  imports: [MatButtonModule, DatePipe],
  templateUrl: './transaction-step5-seller.component.html',
  styleUrl: './transaction-step5-seller.component.css',
})
export class TransactionStep5SellerComponent implements OnInit {
  transaction: TransactionResponseDTO | null = null;
  constructor(
    private transactionSharedService: TransactionSharedService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const transactionID = this.route.snapshot.paramMap.get('transactionID');
    if (transactionID){
      this.transactionSharedService
        .getTransactionByTransactionID(transactionID)
        .subscribe({
          next: (transaction: TransactionResponseDTO) => {
            this.transaction = transaction;
            // this.loading = false;
          },
          error: (error: HttpErrorResponse) => {
            console.error(error);
            // this.loading = false;
          },
        });
    }
  }

  dispute(): void {
    // no op
  }
}
