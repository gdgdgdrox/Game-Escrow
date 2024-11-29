import { Component, Input } from '@angular/core';
import { TransactionResponseDTO } from '../../../dto/transaction-response.dto';

@Component({
  selector: 'app-transaction-step1-completed',
  standalone: true,
  imports: [],
  templateUrl: './transaction-step1-completed.component.html',
  styleUrl: './transaction-step1-completed.component.css'
})
export class TransactionStep1CompletedComponent {
  @Input() transaction!: TransactionResponseDTO;
  
}
