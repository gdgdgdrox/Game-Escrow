import { Component, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';
import { TransactionSharedService } from '../../service/transaction/transaction-shared.service';
import { GameResponseDTO } from '../../dto/game-response.dto';
import { HttpErrorResponse } from '@angular/common/http';



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
export class HomeComponent implements OnInit{
  games: GameResponseDTO[] = [];
  ngOnInit(): void {
    console.log('init');
    this.transactionSharedService.getAllGames().subscribe({
      next: (games: GameResponseDTO[]) => {
        console.log('got back response');
        this.games = games;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  constructor(private transactionSharedService: TransactionSharedService){}
  // games = [
  //   {
  //     title: 'Maplestory',
  //     image: 'assets/image/games/maplestory.png'
  //   },
  //   {
  //     title: 'Clash Of Clans',
  //     image: 'assets/image/games/clash_of_clans.png'
  //   },
  //   {
  //     title: 'CS GO',
  //     image: 'assets/image/games/cs_go.webp'
  //   },
  //   {
  //     title: 'Dota',
  //     image: 'assets/image/games/Dota 2.png'
  //   },
  //   {
  //     title: 'Genshin Impact',
  //     image: 'assets/image/games/genshin_impact.png'
  //   },
  //   {
  //     title: 'Honkai Star Rail',
  //     image: 'assets/image/games/honkai_star_rail.jpg'
  //   },
  //   {
  //     title: 'Pokemon GO',
  //     image: 'assets/image/games/Pokemon GO.webp'
  //   },
  //   {
  //     title: 'Team Fortress 2',
  //     image: 'assets/image/games/team_fortress_2.png'
  //   },
  //   {
  //     title: 'Wuthering Waves',
  //     image: 'assets/image/games/wuthering_waves.png'
  //   },
  //   {
  //     title: 'Default Icon',
  //     image: 'assets/image/games/default.jpg'
  //   }

  

}
