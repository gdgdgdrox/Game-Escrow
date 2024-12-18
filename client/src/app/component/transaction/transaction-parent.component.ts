import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatStepperModule } from '@angular/material/stepper';
import { TransactionStep3BuyerComponent } from './step3/transaction-step3-buyer/transaction-step3-buyer.component';
import { AuthService } from '../../service/auth.service';
import { TransactionStep2CounterpartyComponent } from './step2/transaction-step2-counterparty/transaction-step2-counterparty.component';
import { TransactionStep2PendingComponent } from './step2/transaction-step2-pending/transaction-step2-pending.component';
import { TransactionResponseDTO } from '../../dto/transaction-response.dto';
import { TransactionSharedService } from '../../service/transaction/transaction-shared.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TransactionStep3SellerComponent } from './step3/transaction-step3-seller/transaction-step3-seller.component';
import { TransactionStep4BuyerComponent } from './step4/transaction-step4-buyer/transaction-step4-buyer.component';
import { TransactionStep4SellerComponent } from './step4/transaction-step4-seller/transaction-step4-seller.component';
import { TransactionStateService } from '../../service/transaction-state.service';
import { TransactionStep2CompletedComponent } from './step2/transaction-step2-completed/transaction-step2-completed.component';
import { TransactionStep3CompletedComponent } from './step3/transaction-step3-completed/transaction-step3-completed.component';
import { TransactionStep5BuyerComponent } from './step5/transaction-step5-buyer/transaction-step5-buyer.component';
import { TransactionStep5SellerComponent } from './step5/transaction-step5-seller/transaction-step5-seller.component';
import { TransactionStep4CompletedComponent } from './step4/transaction-step4-completed/transaction-step4-completed.component';
import { MatButtonModule } from '@angular/material/button';
import { TransactionStep1CompletedComponent } from './step1/transaction-step1-completed/transaction-step1-completed.component';
import { TransactionStep1Component } from './step1/transaction-step1/transaction-step1.component';

@Component({
  selector: 'app-transaction-parent',
  standalone: true,
  imports: [
    RouterModule,
    MatStepperModule,
    MatButtonModule,
    TransactionStep1Component,
    TransactionStep1CompletedComponent,
    TransactionStep2CounterpartyComponent,
    TransactionStep2PendingComponent,
    TransactionStep2CompletedComponent,
    TransactionStep3BuyerComponent,
    TransactionStep3SellerComponent,
    TransactionStep3CompletedComponent,
    TransactionStep4BuyerComponent,
    TransactionStep4SellerComponent,
    TransactionStep4CompletedComponent,
    TransactionStep5BuyerComponent,
    TransactionStep5SellerComponent
  ],
  templateUrl: './transaction-parent.component.html',
  styleUrl: './transaction-parent.component.css',
})
export class TransactionParentComponent implements OnInit, OnDestroy{
  transaction!: TransactionResponseDTO;
  userID!: string;
  currentStep = 1;
  steps = [
    { index: 1, label: '1', completed: false },
    { index: 2, label: '2', completed: false },
    { index: 3, label: '3', completed: false },
    { index: 4, label: '4', completed: false },
    { index: 5, label: '5', completed: false }
  ];
  loading: boolean = true;

  constructor(
    private authService: AuthService,
    private transactionSharedService: TransactionSharedService,
    private route: ActivatedRoute,
    private transactionStateService: TransactionStateService


  ) {}
  ngOnDestroy(): void {
    this.transactionStateService.transaction = null;
  }

  ngOnInit(): void { 
    const transactionID = this.route.snapshot.paramMap.get('transactionID');
    if (this.transactionStateService.transaction){
      console.log('retrieving transaction object from shared service');
      this.transaction = this.transactionStateService.transaction;
      console.log(this.transaction);
      this.userID = this.authService.getLoggedInUsername()!;
      this.currentStep = this.transaction.currentStep;
      this.loading = false;
    }
    else if (transactionID && !this.transaction){
      console.log(`getting transaction ${transactionID}`);
      this.transactionSharedService
        .getTransactionByTransactionID(transactionID)
        .subscribe({
          next: (transaction: TransactionResponseDTO) => {
            this.userID = this.authService.getLoggedInUsername()!;
            console.log(transaction);
            this.transaction = transaction;    
            this.currentStep = this.transaction.currentStep;
            this.loading = false; 
          },
          error: (error: HttpErrorResponse) => {
            console.error(error);
            this.loading = false; 
          },
        });
      }
      else{
        this.loading = false; 
      }
   }


  goToStep(index: number) {
    if (index < this.currentStep) {
      this.currentStep = index;
    }else if (index > this.currentStep){
      if (this.transaction){
        if ((index <= this.transaction.currentStep)){
          this.currentStep = index;
      }
      }
    }
  }
  
}
