import { Component, Input } from '@angular/core';
import { TransactionResponseDTO } from '../../../dto/transaction-response.dto';

@Component({
  selector: 'app-transaction-step3-seller',
  standalone: true,
  imports: [],
  templateUrl: './transaction-step3-seller.component.html',
  styleUrl: './transaction-step3-seller.component.css'
})
export class TransactionStep3SellerComponent {
  @Input() transaction!: TransactionResponseDTO;
}
