import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { TransactionStep1Component } from './transaction-step1/transaction-step1.component';
import { TransactionStep3BuyerComponent } from './transaction-step3-buyer/transaction-step3-buyer.component';
import { TransactionStep4Component } from './transaction-step4/transaction-step4.component';
import { TransactionStep5Component } from './transaction-step5/transaction-step5.component';
import { AuthService } from '../../service/auth.service';
import { TransactionStep2CounterpartyComponent } from './transaction-step2-counterparty/transaction-step2-counterparty.component';
import { TransactionStep2PendingComponent } from './transaction-step2-pending/transaction-step2-pending.component';
import { TransactionResponseDTO } from '../../dto/transaction-response.dto';
import { TransactionService } from '../../service/transaction/transaction.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TransactionStep3SellerComponent } from './transaction-step3-seller/transaction-step3-seller.component';
import { TransactionStep4BuyerComponent } from './transaction-step4-buyer/transaction-step4-buyer.component';
import { TransactionStep4SellerComponent } from './transaction-step4-seller/transaction-step4-seller.component';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { TransactionStep1CompletedComponent } from './transaction-step1-completed/transaction-step1-completed.component';
import { TransactionSteps } from '../../dto/transaction-step';

@Component({
  selector: 'app-transaction-parent',
  standalone: true,
  imports: [
    RouterModule,
    MatStepperModule,
    TransactionStep1Component,
    TransactionStep1CompletedComponent,
    TransactionStep2CounterpartyComponent,
    TransactionStep2PendingComponent,
    TransactionStep3BuyerComponent,
    TransactionStep3SellerComponent,
    TransactionStep4BuyerComponent,
    TransactionStep4SellerComponent,
    TransactionStep5Component,
  ],
  templateUrl: './transaction-parent.component.html',
  styleUrl: './transaction-parent.component.css',
})
export class TransactionParentComponent implements AfterViewInit {
  transaction!: TransactionResponseDTO;
  userID!: string;
  currentStep = 1;
  steps = [
    { index: 1, label: 'Step 1', completed: false },
    { index: 2, label: 'Step 2', completed: false },
    { index: 3, label: 'Step 3', completed: false },
  ];

  constructor(
    private authService: AuthService,
    private transactionService: TransactionService,
    private route: ActivatedRoute,
    private cdr :ChangeDetectorRef

  ) {}

  ngOnInit(): void { 
    console.log('transaction parent init');
    const transactionID = this.route.snapshot.paramMap.get('transactionID');
    if (transactionID) {
      this.transactionService
        .getTransactionByTransactionID(transactionID)
        .subscribe({
          next: (transaction: TransactionResponseDTO) => {
            this.userID = this.authService.getLoggedInUser();
            console.log(transaction);
            this.transaction = transaction;    
            this.currentStep = this.transaction.currentStep;
          },
          error: (error: HttpErrorResponse) => {
            console.error(error);
          },
        });
    }
   }

  ngAfterViewInit(): void {
    console.log('transaction parent afterViewInit');
   

  }

  handleCreatedTransaction(transaction: TransactionResponseDTO) {
    this.transaction = transaction;
    this.userID = this.authService.getLoggedInUser();
    this.currentStep = 2;
  }

  handleTradeAcceptedNotification(transaction: TransactionResponseDTO) {
    this.transaction = transaction;
    this.currentStep = 3;
  }

  handleTradeAccepted(transaction: TransactionResponseDTO) {
    this.transaction = transaction;
    console.log('txn current step',this.transaction.currentStep);
    this.currentStep = 3;
  }

  handleMoneyTransferred(transaction: TransactionResponseDTO) {
    this.transaction = transaction;
  }

  handleMoneyTransferredNotification(transaction: TransactionResponseDTO) {
    this.transaction = transaction;
  }

  // logStepperChange(event: StepperSelectionEvent) {
  //   console.log(`Stepper changed to index: ${event.selectedIndex}`);
  // }

  // nextStep() {
  //   if (this.currentStep < this.steps.length ) {
  //     this.markStepComplete(this.currentStep);
  //     this.currentStep++;
  //   }
  // }

  // previousStep() {
  //   if (this.currentStep > 1) {
  //     this.currentStep--;
  //   }
  // }

  goToStep(index: number) {
    console.log(`currently on ${this.currentStep}, trying to go to ${index}`);
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

  markStepComplete(index: number) {
    this.steps[index].completed = true;
  }

  // isStepNavigatable(stepIndex: number){
  //   console.log(`stepIndex=${stepIndex} | currentStep=${this.currentStep}`);
  //   if (stepIndex > this.currentStep){
  //     const stepKey = `transactionStep${stepIndex}` as keyof TransactionSteps;
  //     if (this.transaction && (this.transaction.currentStep >= stepIndex)){
  //       return true;
  //     }
  //     return false;
  //   }
  //   return false;
  // }
  
}
