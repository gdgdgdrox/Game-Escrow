import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { TransactionResponseDTO } from '../../../dto/transaction-response.dto';
import { WebsocketService } from '../../../service/websocket.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { TransactionStateService } from '../../../service/transaction-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-step2-pending',
  standalone: true,
  imports: [MatSnackBarModule],
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
    console.log('step 2 pending init');
    this.websocketService.connect(); // Connect to the WebSocket
    const topic = `/topic/transaction/${this.transaction.transactionID}`;
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
        this.router.navigate(['/transaction-parent',`step${transaction.currentStep}`,transaction.transactionID]);
      }, 3000);
    }
  }
}
