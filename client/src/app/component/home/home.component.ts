import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatGridListModule,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  games = [
    {
      title: 'Maplestory',
      image: 'assets/image/games/maplestory.png'
    },
    {
      title: 'Clash Of Clans',
      image: 'assets/image/games/clash_of_clans.jpeg'
    },
    {
      title: 'CS GO',
      image: 'assets/image/games/cs_go.png'
    },
    {
      title: 'Dota',
      image: 'assets/image/games/dota.png'
    },
    {
      title: 'Genshin Impact',
      image: 'assets/image/games/genshin_impact.png'
    },
    {
      title: 'Honkai Star Rail',
      image: 'assets/image/games/honkai_star_rail.jpg'
    },
    {
      title: 'Pokemon GO',
      image: 'assets/image/games/pokemon_go.png'
    },
    {
      title: 'Team Fortress 2',
      image: 'assets/image/games/team_fortress_2.png'
    },
    {
      title: 'Wuthering Waves',
      image: 'assets/image/games/wuthering_waves.png'
    },

  ]
  // steps = [
  //   {
  //     icon: 'play_arrow',
  //     title: 'Buyer or Seller Initiate Trade',
  //     // description: 'The buyer or seller starts the trade.'
  //   },
  //   {
  //     icon: 'check_circle',
  //     title: 'Other Party Accepts Trade',
  //     // description: 'The counterparty accepts the terms of the trade.'
  //   },
  //   {
  //     icon: 'credit_card',
  //     title: 'Buyer Pays Escrow',
  //     // description: 'The buyer pays the agreed amount into escrow.'
  //   },
  //   {
  //     icon: 'assignment_turned_in',
  //     title: 'Seller Releases Game Item',
  //     // description: 'The seller releases the game item to the buyer.'
  //   },
  //   {
  //     icon: 'attach_money',
  //     title: 'Escrow Releases Payment to Seller',
  //     // description: 'The escrow releases the payment to the seller.'
  //   },

  // ]
}
