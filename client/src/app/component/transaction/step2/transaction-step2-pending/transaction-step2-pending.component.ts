import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TransactionResponseDTO } from '../../../../dto/transaction-response.dto';
import { WebsocketService } from '../../../../service/websocket.service';
import { TransactionStateService } from '../../../../service/transaction-state.service';
import { Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-transaction-step2-pending',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './transaction-step2-pending.component.html',
  styleUrl: './transaction-step2-pending.component.css',
})
export class TransactionStep2PendingComponent implements OnInit, OnDestroy {
  @Input() transaction!: TransactionResponseDTO;
  message = '';

  constructor(
    private websocketService: WebsocketService,
    private transactionStateService: TransactionStateService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.websocketService.connect(); // Connect to the WebSocket
    const topic = `/topic/transaction/step2/${this.transaction.transactionID}`;
    this.websocketService.subscribeToTopic(topic, (transaction) => this.onMessageReceived(transaction));
  }

  ngOnDestroy(): void {
    this.websocketService.disconnect();
  }

  onMessageReceived(transaction: TransactionResponseDTO): void {
    console.log('received notification');
    if (transaction.transactionSteps.transactionStep2.status === 'completed') {
      this.message = `${transaction.counterparty} has accepted the trade!`
      setTimeout(() => {
        this.transactionStateService.transaction = transaction;
        console.log('shared service state updated. navigating to parent');
        this.router.navigate(['/transaction',`step${transaction.currentStep}`,transaction.transactionID]);
      }, 3000);
    }
  }
}
