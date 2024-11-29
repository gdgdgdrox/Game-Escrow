import { Component } from '@angular/core';

@Component({
  selector: 'app-transaction-step4-buyer',
  standalone: true,
  imports: [],
  templateUrl: './transaction-step4-buyer.component.html',
  styleUrl: './transaction-step4-buyer.component.css'
})
export class TransactionStep4BuyerComponent {

  ngOnInit():void{
    console.log('step 4 buyer init');
  }
}
