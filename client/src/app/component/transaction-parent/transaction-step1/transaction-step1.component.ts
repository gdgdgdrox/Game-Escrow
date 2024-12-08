import { Component, OnInit,  } from '@angular/core';
import { GameResponseDTO } from '../../../dto/game-response.dto';
import { TransactionStep1Service } from '../../../service/transaction/transaction-step1.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Router, RouterModule } from '@angular/router';
import { GameAssetResponseDTO } from '../../../dto/game-asset-response.dto';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../service/auth.service';
import { TransactionRequestDTO } from '../../../dto/transaction-request.dto';
import { TransactionResponseDTO } from '../../../dto/transaction-response.dto';
import { TransactionStateService } from '../../../service/transaction-state.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { finalize } from 'rxjs/internal/operators/finalize';

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
  createTransactionStatusMessage = '';
  isProcessing = false;

  constructor(
    private transactionStep1Service: TransactionStep1Service,
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
    this.transactionStep1Service.getAllGames().subscribe({
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
      const loggedInUser = this.authService.getLoggedInUser();
      if (!loggedInUser) {
        this.router.navigate(['/login']);
      } else {
        const transactionRequestDTO = this.createTransactionRequestDTO(this.form.controls, loggedInUser);
        console.log('creating new transaction');
        this.transactionStep1Service
          .createNewTransaction(transactionRequestDTO).pipe(
            finalize(() => {
              this.isProcessing = false;
            }))
          .subscribe({
            next: (transaction: TransactionResponseDTO | null) => {
              if (transaction){
                this.createTransactionStatusMessage = 'Success !';
                this.transactionStateService.transaction = transaction;
                setTimeout(() => {
                  this.router.navigate(['/transaction-parent/step2',transaction.transactionID]);
                }, 3000)
              }
              else{
                this.createTransactionStatusMessage = `${transactionRequestDTO.counterparty} is not a registered user. Unable to proceed.`
              }
            },
            error: (error) => {
              console.log(error);
              this.createTransactionStatusMessage = 'Failed to create transaction due to unknown server error.'
            },
          });
      }
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
