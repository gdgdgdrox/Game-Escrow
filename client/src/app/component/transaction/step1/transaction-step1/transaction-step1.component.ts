import { Component, OnInit,  } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Router, RouterModule } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { GameResponseDTO } from '../../../../dto/game-response.dto';
import { GameAssetResponseDTO } from '../../../../dto/game-asset-response.dto';
import { TransactionStep1Service } from '../../../../service/transaction/transaction-step1.service';
import { TransactionSharedService } from '../../../../service/transaction/transaction-shared.service';
import { AuthService } from '../../../../service/auth.service';
import { TransactionStateService } from '../../../../service/transaction-state.service';
import { TransactionResponseDTO } from '../../../../dto/transaction-response.dto';
import { TransactionRequestDTO } from '../../../../dto/transaction-request.dto';

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
    CommonModule,
    MatButtonModule, MatProgressSpinnerModule,MatIconModule
  ],
  templateUrl: './transaction-step1.component.html',
  styleUrl: './transaction-step1.component.css',
})
export class TransactionStep1Component implements OnInit {
  form!: FormGroup;
  games: GameResponseDTO[] = [];
  gameAssets: GameAssetResponseDTO[] = [];
  selectedGame!: GameResponseDTO;
  selectedAsset!: GameAssetResponseDTO;
  createTransactionSuccess = false;
  createTransactionStatusMessage = '';
  isProcessing = false;

  constructor(
    private transactionStep1Service: TransactionStep1Service,
    private transactionSharedService: TransactionSharedService,
    private authService: AuthService,
    private router: Router,
    private transactionStateService: TransactionStateService
  ) {
    this.form = new FormGroup({
      transactionType: new FormControl<string>('buy', [Validators.required]),
      gameID: new FormControl<number>(0),
      assetType: new FormControl<string>(''),
      assetName: new FormControl<string>(''),
      assetQuantity: new FormControl<string>(''),
      price: new FormControl<number>(0, [Validators.required, Validators.min(1)]),
      counterparty: new FormControl<string>('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    console.log('step 1 init');
    this.transactionSharedService.getAllGames().subscribe({
      next: (games: GameResponseDTO[]) => {
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
    this.selectedGame = this.games.find((game) => game.gameID == gameID)!;
    this.form.get('assetType')?.reset('');
  }

  updateSelectedAsset(assetType: string) {
    this.selectedAsset = this.selectedGame.gameAssets.find(
      (asset) => asset.assetType === assetType
    )!;
  }

    processNewTransaction() {
      this.isProcessing = true;
      const loggedInUser = this.authService.getLoggedInUsername();
      if (loggedInUser === this.form.controls['counterparty'].value){
        this.createTransactionStatusMessage = 'You cannot start a trade with yourself.';
        this.isProcessing = false;
        return;
      }
        const transactionRequestDTO = this.createTransactionRequestDTO(this.form.controls, loggedInUser!);
        console.log('creating new transaction');
        console.log(transactionRequestDTO);
        this.transactionStep1Service
          .createNewTransaction(transactionRequestDTO)
          .subscribe({
            next: (transaction: TransactionResponseDTO | null) => {
              if (transaction){
                this.transactionStateService.transaction = transaction;
                setTimeout(() => {
                  this.isProcessing = false;
                  this.router.navigate(['/transaction/step2',transaction.transactionID]);
                }, 3000)
              }
              else{
                this.isProcessing = false;
                this.createTransactionStatusMessage = `${transactionRequestDTO.counterparty} is not a registered user`
              }
            },
            error: (error) => {
              console.log(error);
              this.isProcessing = false;
              this.createTransactionStatusMessage = 'Failed to create transaction due to unknown server error'
            },
          });
    }


  createTransactionRequestDTO(formControls:any, loggedInUser:string): TransactionRequestDTO{
    const newTransaction: TransactionRequestDTO = {
      buyer:
        formControls['transactionType'].value === 'buy'
          ? loggedInUser
          : formControls['counterparty'].value,
      seller:
        formControls['transactionType'].value === 'sell'
          ? loggedInUser
          : formControls['counterparty'].value,
      counterparty: formControls['counterparty'].value,
      game: {
        gameID: formControls['gameID'].value,
        gameName: this.selectedGame.gameName,
        gameImagePath: this.selectedGame.gameImagePath,
        assetType: formControls['assetType'].value,
        assetName:
          formControls['assetName'].value != ''
            ? formControls['assetName'].value
            : undefined,
        assetQuantity:
          formControls['assetQuantity'].value != ''
            ? formControls['assetQuantity'].value
            : undefined,
      },
      price: formControls['price'].value,
    };
    // delete non-relevant fields
    if (!newTransaction.game.assetName) {
      delete newTransaction.game.assetName;
    }

    if (!newTransaction.game.assetQuantity) {
      delete newTransaction.game.assetQuantity;
    }

    return newTransaction;
  }
}
