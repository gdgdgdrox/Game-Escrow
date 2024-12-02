import { Component, Input } from '@angular/core';
import { TransactionResponseDTO } from '../../../dto/transaction-response.dto';

@Component({
  selector: 'app-transaction-step5-seller',
  standalone: true,
  imports: [],
  templateUrl: './transaction-step5-seller.component.html',
  styleUrl: './transaction-step5-seller.component.css'
})
export class TransactionStep5SellerComponent {
  @Input() transaction!: TransactionResponseDTO;

}
