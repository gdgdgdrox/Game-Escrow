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

@Component({
  selector: 'app-transaction-parent',
  standalone: true,
  imports: [
    RouterModule,
    MatStepperModule,
    TransactionStep1Component,
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
  @ViewChild('stepper') stepper!: MatStepper;

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
          },
          error: (error: HttpErrorResponse) => {
            console.error(error);
          },
        });
    }
   }

  ngAfterViewInit(): void {
    console.log('transaction parent afterViewInit');
    setTimeout(() =>{
      if (this.transaction){
  
        this.stepper.linear = false;
        this.stepper.selectedIndex = this.transaction?.currentStep-1;
        console.log(this.stepper.selectedIndex);
        this.cdr.detectChanges();
        setTimeout(() => {
          this.stepper.linear = true;
      });
      }
    })



  }

  handleCreatedTransaction(transaction: TransactionResponseDTO) {
    this.transaction = transaction;
    this.userID = this.authService.getLoggedInUser();
  }

  handleTradeAcceptedNotification(transaction: TransactionResponseDTO) {
    this.transaction = transaction;
  }

  handleTradeAccepted(transaction: TransactionResponseDTO) {
    this.transaction = transaction;
  }

  handleMoneyTransferred(transaction: TransactionResponseDTO) {
    this.transaction = transaction;
  }

  handleMoneyTransferredNotification(transaction: TransactionResponseDTO) {
    this.transaction = transaction;
  }

  logStepperChange(event: StepperSelectionEvent) {
    console.log(`Stepper changed to index: ${event.selectedIndex}`);
  }

  onStepChange(event: any): void {
    // Prevent navigating to previous steps
    if (event.selectedIndex < this.transaction.currentStep - 1) {
      console.log(`trying to navigate to ${event.selectedIndex}`);
      setTimeout(() => this.stepper!.selectedIndex = this.transaction.currentStep - 1);
    }
  }

  isStepCompleted(stepNumber:number){
    if (this.transaction){
      if (this.transaction.currentStep > stepNumber){
        return true;
      }
      return false;
    } 
    return false;
  }
  
}
