import { Component, Input } from '@angular/core';
import { TransactionResponseDTO } from '../../../dto/transaction-response.dto';
import { OCBCApiService } from '../../../service/ocbc-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TransactionStep3Service } from '../../../service/transaction/transaction-step3.service';
import { TransactionStateService } from '../../../service/transaction-state.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-transaction-step3-buyer',
  standalone: true,
  imports: [MatButtonModule,MatProgressSpinnerModule],
  templateUrl: './transaction-step3-buyer.component.html',
  styleUrl: './transaction-step3-buyer.component.css',
})
export class TransactionStep3BuyerComponent {
  isVerifyingTransfer = false;
  @Input() transaction!: TransactionResponseDTO;
  qrPic: string = `data:image/png;base64,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`;

  constructor(
    private ocbcApiService: OCBCApiService,
    private transactionStep3Service: TransactionStep3Service,
    private transactionStateService: TransactionStateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('step 3 buyer init');
  }

  // OCBC API Sandbox
  // getQR(): void{
  //   this.ocbcApiService.getQR().subscribe({
  //     next: (data: any) => {
  //       console.log('data received');
  //       console.log('Status: ', data['Success']);
  //       const base64EncodedPic = data['Results']['QRCodeData'];
  //       // this.qrPic = `data:image/png;base64,${base64EncodedPic}`;
  //         this.qrPic=`data:image/png;base64,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`
  //     },
  //     error: (error: HttpErrorResponse) => {
  //       console.log('error occurred while calling api');
  //       console.error(error);
  //     }
  //   });
  // }

  getQR(): void {
    this.qrPic = `data:image/png;base64,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`;
  }

  onTransfer(): void {
    console.log('clicked money transferred');
    this.isVerifyingTransfer = true;
    this.transactionStep3Service
      .moneyTransferred(this.transaction.transactionID)
      .subscribe({
        next: (transaction: TransactionResponseDTO) => {
          console.log(
            `response received from server. step 3 status: ${transaction.transactionSteps.transactionStep3.status}`
          );
          this.transactionStateService.transaction = transaction;
          console.log('shared service state updated. navigating to parent');
          setTimeout(() => {
            this.router.navigate([
              '/transaction-parent',
              `step${transaction.currentStep}`,
              transaction.transactionID,
            ]);
          },3000)
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
          this.isVerifyingTransfer = false;
        },
      });
  }
}
