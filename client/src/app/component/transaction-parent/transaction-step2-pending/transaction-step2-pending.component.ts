import { Component, Input, OnInit } from '@angular/core';
import { TransactionResponseDTO } from '../../../dto/transaction-response.dto';
import { WebsocketService } from '../../../service/websocket.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-transaction-step2-pending',
  standalone: true,
  imports: [MatSnackBarModule],
  templateUrl: './transaction-step2-pending.component.html',
  styleUrl: './transaction-step2-pending.component.css',
})
export class TransactionStep2PendingComponent implements OnInit {
  @Input()
  transaction!: TransactionResponseDTO;

  constructor(private websocketService: WebsocketService){}
  
  ngOnInit(): void {
    this.websocketService.connect(this.transaction.transactionID, this.onMessageReceived);
  }

  onMessageReceived(transaction: TransactionResponseDTO):void{
    console.log('received latest transaction entity');
    console.log(transaction);
    // if (transactionEntity.transactionSteps[2].)

    // if (message.type === 'tradeAccepted') {
    //   // Display the snackbar message
    //   this.snackBar.open('User has accepted the trade', 'Dismiss', {
    //     duration: 3000, // Show for 3 seconds
    //     horizontalPosition: 'center',
    //     verticalPosition: 'top',
    //   });

    //   // Navigate after 3 seconds
    //   setTimeout(() => {
    //     this.router.navigate(['/next-component']);
    //   }, 3000);
    // }
  }
}
