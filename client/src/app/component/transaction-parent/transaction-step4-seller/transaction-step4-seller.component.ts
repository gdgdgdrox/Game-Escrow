import { Component, Input, OnInit } from '@angular/core';
import { TransactionResponseDTO } from '../../../dto/transaction-response.dto';

@Component({
  selector: 'app-transaction-step4-seller',
  standalone: true,
  imports: [],
  templateUrl: './transaction-step4-seller.component.html',
  styleUrl: './transaction-step4-seller.component.css'
})
export class TransactionStep4SellerComponent implements OnInit{
  @Input() transaction!: TransactionResponseDTO

  ngOnInit():void{
    console.log('step 4 seller init');
  }
}
