import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { TransactionResponseDTO } from '../../../dto/transaction-response.dto';
import { WebsocketService } from '../../../service/websocket.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-transaction-step2-pending',
  standalone: true,
  imports: [MatSnackBarModule],
  templateUrl: './transaction-step2-pending.component.html',
  styleUrl: './transaction-step2-pending.component.css',
})
export class TransactionStep2PendingComponent implements OnInit, OnDestroy {
  @Input() transaction!: TransactionResponseDTO;
  @Input() stepper!: MatStepper;
  @Output() onTradeAcceptedNotification =
    new EventEmitter<TransactionResponseDTO>();
  message = '';

  constructor(
    private websocketService: WebsocketService,
  ) {}
  
  ngOnInit(): void {
    this.websocketService.connect(); // Connect to the WebSocket
    setTimeout(() => {
      this.websocketService.subscribeToTopic(
        this.transaction.transactionID,
        (transaction) => this.onMessageReceived(transaction)
      );
    },3000)
  }

  ngOnDestroy(): void {
    this.websocketService.disconnect();
  }

  onMessageReceived(transaction: TransactionResponseDTO): void {
    console.log('received latest transaction entity');
    console.log(transaction);
    if (transaction.transactionSteps.transactionStep2.status === 'completed') {
      this.message = `${transaction.counterparty} has accepted the trade!`
      setTimeout(() => {
        this.onTradeAcceptedNotification.emit(transaction);
        this.stepper.next();
      }, 3000);
    }
  }
}
