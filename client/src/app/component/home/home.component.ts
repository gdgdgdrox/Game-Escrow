import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  steps = [
    {
      icon: 'play_arrow',
      title: 'Buyer or Seller Initiate Trade',
      // description: 'The buyer or seller starts the trade.'
    },
    {
      icon: 'check_circle',
      title: 'Other Party Accepts Trade',
      // description: 'The counterparty accepts the terms of the trade.'
    },
    {
      icon: 'credit_card',
      title: 'Buyer Pays Escrow',
      // description: 'The buyer pays the agreed amount into escrow.'
    },
    {
      icon: 'assignment_turned_in',
      title: 'Seller Releases Game Item',
      // description: 'The seller releases the game item to the buyer.'
    },
    {
      icon: 'attach_money',
      title: 'Escrow Releases Payment to Seller',
      // description: 'The escrow releases the payment to the seller.'
    },

  ]
}
