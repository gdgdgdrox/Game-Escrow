import { Component } from '@angular/core';

@Component({
  selector: 'app-transaction-step4-seller',
  standalone: true,
  imports: [],
  templateUrl: './transaction-step4-seller.component.html',
  styleUrl: './transaction-step4-seller.component.css'
})
export class TransactionStep4SellerComponent {
  ngOnInit():void{
    console.log('step 4 seller init');
  }
}
