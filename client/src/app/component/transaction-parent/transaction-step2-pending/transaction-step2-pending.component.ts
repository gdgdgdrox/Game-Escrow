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
  @Output() onTradeAcceptedNotification =
    new EventEmitter<TransactionResponseDTO>();
  message = '';

  constructor(
    private websocketService: WebsocketService,
  ) {}
  
  ngOnInit(): void {
    console.log('step 2 pending init');
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
    if (transaction.transactionSteps.transactionStep2.status === 'completed') {
      this.message = `${transaction.counterparty} has accepted the trade!`
      setTimeout(() => {
        this.onTradeAcceptedNotification.emit(transaction);
      }, 3000);
    }
  }
}
