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
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatGridListModule,
    RouterModule,
    MatButtonModule
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
  //     gameName: 'Maplestory',
  //     gameImagePath: 'assets/image/games/maplestory.png'
  //   },
  //   {
  //     gameName: 'Clash Of Clans',
  //     gameImagePath: 'assets/image/games/clash_of_clans.png'
  //   },
  //   {
  //     gameName: 'CS GO',
  //     gameImagePath: 'assets/image/games/cs_go.webp'
  //   },
  //   {
  //     gameName: 'Dota',
  //     gameImagePath: 'assets/image/games/Dota 2.png'
  //   },
  //   {
  //     gameName: 'Genshin Impact',
  //     gameImagePath: 'assets/image/games/genshin_impact.png'
  //   },
  //   {
  //     gameName: 'Honkai Star Rail',
  //     gameImagePath: 'assets/image/games/honkai_star_rail.jpg'
  //   },
  //   {
  //     gameName: 'Pokemon GO',
  //     gameImagePath: 'assets/image/games/Pokemon GO.webp'
  //   },
  //   {
  //     gameName: 'Team Fortress 2',
  //     gameImagePath: 'assets/image/games/team_fortress_2.png'
  //   },
  //   {
  //     gameName: 'Wuthering Waves',
  //     gameImagePath: 'assets/image/games/wuthering_waves.png'
  //   },
  //   {
  //     gameName: 'Default Icon',
  //     gameImagePath: 'assets/image/games/default.jpg'
  //   },
  //   {
  //     gameName: 'World Of Warcraft',
  //     gameImagePath: 'assets/image/games/wow.jpeg'
  //   },
  //   {
  //     gameName: 'Valorant',
  //     gameImagePath: 'assets/image/games/valorant.png'
  //   },
  //   {
  //     gameName: 'Runescape',
  //     gameImagePath: 'assets/image/games/runescape.png'
  //   },
  //   {
  //     gameName: 'PUBG',
  //     gameImagePath: 'assets/image/games/pubg.png'
  //   },
  //   {
  //     gameName: 'EVE Online',
  //     gameImagePath: 'assets/image/games/eve_online.png'
  //   },
  //   {
  //     gameName: 'Fortnite',
  //     gameImagePath: 'assets/image/games/fortnite.png'
  //   }
  // ]

  

}
