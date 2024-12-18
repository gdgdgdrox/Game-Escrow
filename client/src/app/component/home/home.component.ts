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
    this.transactionSharedService.getAllGames().subscribe({
      next: (games: GameResponseDTO[]) => {
        this.games = games;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  constructor(private transactionSharedService: TransactionSharedService){}

}
