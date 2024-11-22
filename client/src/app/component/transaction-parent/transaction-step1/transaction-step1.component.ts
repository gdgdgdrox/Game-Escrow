import { Component, OnInit } from '@angular/core';

import { Game } from '../../../model/game';
import { TransactionStep1Service } from '../../../service/transaction/transaction-step1.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Router, RouterModule } from '@angular/router';
import { GameAsset } from '../../../model/game.asset';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../service/auth.service';
import { Transaction } from '../../../model/transaction';

@Component({
  selector: 'app-transaction-step1',
  standalone: true,
  imports: [
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatInputModule,
    MatSelectModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './transaction-step1.component.html',
  styleUrl: './transaction-step1.component.css',
})
export class TransactionStep1Component implements OnInit {
  form!: FormGroup;
  games: Game[] = [];
  gameAssets: GameAsset[] = [];
  selectedGame!: Game;
  selectedAsset!: GameAsset;
  message!: string;
  isProcessing = false;

  constructor(
    private transactionStep1Service: TransactionStep1Service,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = new FormGroup({
      transactionType: new FormControl<string>('buy'),
      gameID: new FormControl<number>(0),
      assetType: new FormControl<string>(''),
      name: new FormControl<string>(''),
      quantity: new FormControl<string>(''),
      price: new FormControl<number>(0),
      counterparty: new FormControl<string>(''),
    });
  }

  ngOnInit(): void {
    console.log('on init');
    this.transactionStep1Service.getAllGames().subscribe({
      next: (games: Game[]) => {
        this.games = games;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });

    this.form.get('gameID')?.valueChanges.subscribe((selectedGameID) => {
      this.updateSelectedGame(selectedGameID);
    });
    this.form.get('assetType')?.valueChanges.subscribe((assetType) => {
      this.updateSelectedAsset(assetType);
    });
  }

  updateSelectedGame(gameID: number) {
    this.selectedGame = this.games.find((game) => game.id == gameID)!;
    this.form.get('assetType')?.reset('');
  }

  updateSelectedAsset(assetType: string) {
    this.selectedAsset = this.selectedGame.assets.find(
      (asset) => asset.type === assetType
    )!;
  }

  processNewTransaction() {
    this.isProcessing = true;
    console.log(this.form.value);
    const loggedInUser = this.authService.getLoggedInUser();
    if (!loggedInUser){
      this.message = 'timed out. please login again.'
      this.router.navigate(['/login']);
    }
    else{
      const formControls = this.form.controls;
      const newTransaction: Transaction = {
        buyer: formControls['transactionType'].value === 'buy' ? loggedInUser : formControls['counterparty'].value,
        seller: formControls['transactionType'].value === 'sell' ? loggedInUser : formControls['counterparty'].value,
          counterparty: formControls['counterparty'].value ,
          game: {
            id: formControls['gameID'].value,
            assetType: formControls['assetType'].value,
            name: formControls['name'].value != '' ? formControls['name'].value : undefined,
            quantity: formControls['quantity'].value != '' ? formControls['quantity'].value : undefined
          },
          price: formControls['price'].value
        };
        if (!newTransaction.game.name) {
          delete newTransaction.game.name;
      }
      
      // Similarly, delete 'quantity' if it is empty or undefined
      if (!newTransaction.game.quantity) {
          delete newTransaction.game.quantity;
      }
      
      console.log(newTransaction);
      console.log('sending POST req to server..');
      this.transactionStep1Service.createNewTransaction(newTransaction).subscribe({
        next: response => {
          console.log(response);
        },
        error: error => {
          console.log(error);
        }
      })
      }
    
   

    
  }

}
