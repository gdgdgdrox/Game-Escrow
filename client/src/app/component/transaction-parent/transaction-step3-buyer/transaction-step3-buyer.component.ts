import { Component, Input, OnInit } from '@angular/core';
import { TransactionResponseDTO } from '../../../dto/transaction-response.dto';

@Component({
  selector: 'app-transaction-step3-buyer',
  standalone: true,
  imports: [],
  templateUrl: './transaction-step3-buyer.component.html',
  styleUrl: './transaction-step3-buyer.component.css'
})
export class TransactionStep3BuyerComponent implements OnInit{
  @Input() transaction!: TransactionResponseDTO;

  ngOnInit(): void {
    console.log(this.transaction);
  }

 


}
