import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { TransactionResponseDTO } from '../../../dto/transaction-response.dto';
import { WebsocketService } from '../../../service/websocket.service';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-transaction-step3-seller',
  standalone: true,
  imports: [],
  templateUrl: './transaction-step3-seller.component.html',
  styleUrl: './transaction-step3-seller.component.css'
})
export class TransactionStep3SellerComponent implements OnInit, OnDestroy{
  @Input() transaction!: TransactionResponseDTO;
  @Output() onMoneyTransferredNotification = new EventEmitter<TransactionResponseDTO>();
  message = '';

  constructor(private websocketService: WebsocketService){}

  ngOnInit(): void {
    console.log('step 3 seller init');
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
    if (transaction.transactionSteps.transactionStep3.status === 'completed') {
      this.message = `${transaction.buyer} has transferred the money to us!`
      setTimeout(() => {
        this.onMoneyTransferredNotification.emit(transaction);
      }, 3000);
    }
  }

}
