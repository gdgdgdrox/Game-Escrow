import { Component, Input } from '@angular/core';
import { TransactionResponseDTO } from '../../../dto/transaction-response.dto';

@Component({
  selector: 'app-transaction-step5-buyer',
  standalone: true,
  imports: [],
  templateUrl: './transaction-step5-buyer.component.html',
  styleUrl: './transaction-step5-buyer.component.css'
})
export class TransactionStep5BuyerComponent {

  @Input() transaction!: TransactionResponseDTO;
}
