import { AfterViewInit, Component, Input } from '@angular/core';
import { TransactionResponseDTO } from '../../../dto/transaction-response.dto';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-transaction-step5-buyer',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './transaction-step5-buyer.component.html',
  styleUrl: './transaction-step5-buyer.component.css'
})
export class TransactionStep5BuyerComponent{


  @Input() transaction!: TransactionResponseDTO;
}
