import {
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { TransactionResponseDTO } from '../../../../dto/transaction-response.dto';
import { WebsocketService } from '../../../../service/websocket.service';
import { TransactionStateService } from '../../../../service/transaction-state.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-transaction-step3-seller',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './transaction-step3-seller.component.html',
  styleUrl: './transaction-step3-seller.component.css',
})
export class TransactionStep3SellerComponent implements OnInit, OnDestroy {
  @Input() transaction!: TransactionResponseDTO;
  message = '';

  constructor(
    private websocketService: WebsocketService,
    private transactionStateService: TransactionStateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('step 3 seller init');
    this.websocketService.connect();
    const topic = `/topic/transaction/step3/${this.transaction.transactionID}`
    this.websocketService.subscribeToTopic(
      topic,
      (transaction) => this.onMessageReceived(transaction)
    );
  }

  ngOnDestroy(): void {
    this.websocketService.disconnect();
  }


  onMessageReceived(transaction: TransactionResponseDTO): void {
    console.log('received notification that buyer has transferred money');
    console.log(
      `step 3 status: ${transaction.transactionSteps.transactionStep3.status}`
    );
    if (transaction.transactionSteps.transactionStep3.status === 'completed') {
      this.message = `${transaction.buyer} has transferred the money to us!`;
      setTimeout(() => {
        this.transactionStateService.transaction = transaction;
        console.log('shared service state updated. navigating to parent');
        this.router.navigate([
          '/transaction',
          `step${transaction.currentStep}`,
          transaction.transactionID,
        ]);
      }, 3000);
    }
  }
}
