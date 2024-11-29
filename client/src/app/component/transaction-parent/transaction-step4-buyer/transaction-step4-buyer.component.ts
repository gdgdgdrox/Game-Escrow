import { Component, Input, OnInit } from '@angular/core';
import { TransactionResponseDTO } from '../../../dto/transaction-response.dto';

@Component({
  selector: 'app-transaction-step4-buyer',
  standalone: true,
  imports: [],
  templateUrl: './transaction-step4-buyer.component.html',
  styleUrl: './transaction-step4-buyer.component.css'
})
export class TransactionStep4BuyerComponent implements OnInit {
  @Input() transaction!: TransactionResponseDTO
  ngOnInit():void{
    console.log('step4-buyer init');
  }
}
