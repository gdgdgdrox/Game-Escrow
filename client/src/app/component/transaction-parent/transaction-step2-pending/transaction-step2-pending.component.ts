import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
export class TransactionStep2PendingComponent implements OnInit {
  @Input() transaction!: TransactionResponseDTO;
  @Input() stepper!: MatStepper;
  @Output() onTradeAcceptedNotification =
    new EventEmitter<TransactionResponseDTO>();

  constructor(
    private websocketService: WebsocketService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.websocketService.connect(
      this.transaction.transactionID,
      this.onMessageReceived
    );
  }

  onMessageReceived(transaction: TransactionResponseDTO): void {
    console.log('received latest transaction entity');
    console.log(transaction);
    if (transaction.transactionSteps.transactionStep2.status === 'completed') {
      this.snackBar.open('User has accepted the trade', 'Dismiss', {
        duration: 3000, // Show for 3 seconds
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      setTimeout(() => {
        this.onTradeAcceptedNotification.emit(transaction);
        this.stepper.next();
      }, 3000);
    }
  }
}
