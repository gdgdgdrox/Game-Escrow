import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { TransactionStep1Component } from './transaction-step1/transaction-step1.component';
import { TransactionStep2Component } from './transaction-step2/transaction-step2.component';
import { TransactionStep3Component } from './transaction-step3/transaction-step3.component';
import { TransactionStep4Component } from './transaction-step4/transaction-step4.component';
import { TransactionStep5Component } from './transaction-step5/transaction-step5.component';
import { AuthService } from '../../service/auth.service';
import { TransactionStep2CounterpartyComponent } from './transaction-step2-counterparty/transaction-step2-counterparty.component';
import { TransactionStep2PendingComponent } from './transaction-step2-pending/transaction-step2-pending.component';
import { TransactionResponseDTO } from '../../dto/transaction-response.dto';
import { TransactionService } from '../../service/transaction/transaction.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-transaction-parent',
  standalone: true,
  imports: [
    RouterModule,
    MatStepperModule,
    TransactionStep1Component,
    TransactionStep2Component,
    TransactionStep2CounterpartyComponent,
    TransactionStep2PendingComponent,
    TransactionStep3Component,
    TransactionStep4Component,
    TransactionStep5Component,
    
  ],
  templateUrl: './transaction-parent.component.html',
  styleUrl: './transaction-parent.component.css',
})
export class TransactionParentComponent implements AfterViewInit {

  transaction!: TransactionResponseDTO;
  userID!: string;
  @ViewChild('stepper') stepper!: MatStepper;

  constructor(private authService: AuthService, private transactionService: TransactionService, private route: ActivatedRoute) {}

  ngAfterViewInit(): void {
    console.log('in after view init');
    const transactionID =this.route.snapshot.paramMap.get('transactionID');
    if (transactionID){
      console.log(transactionID);
      this.transactionService.getTransactionByTransactionID(transactionID).subscribe({
        next: (response:TransactionResponseDTO) => {
          console.log(response);
          this.transaction = response as TransactionResponseDTO;
          this.stepper.selectedIndex = this.transaction.currentStep - 1;
          console.log(`stepper index: ${this.stepper.selectedIndex}`);
          this.userID = this.authService.getLoggedInUser();
          console.log(this.userID);
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
        },
      });
    }
  

  }

  handleCreatedTransaction(transaction: TransactionResponseDTO) {
    console.log(transaction);
    this.transaction = transaction;
    this.userID = this.authService.getLoggedInUser();
  }

  handleTradeAcceptedNotification(transaction: TransactionResponseDTO) {
    console.log(transaction);
    this.transaction = transaction;
    }

}
