import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, Observable, of } from 'rxjs';
import { API_URL } from '../../constant/api.constant';
import { TransactionRequestDTO } from '../../dto/transaction-request.dto';
import { TransactionResponseDTO } from '../../dto/transaction-response.dto';
import { TransactionSharedService } from './transaction-shared.service';

@Injectable({
  providedIn: 'root',
})
export class TransactionStep1Service {
  constructor(private http: HttpClient, private transactionSharedService: TransactionSharedService) {}

  createNewTransaction(transaction: TransactionRequestDTO): Observable<TransactionResponseDTO | null> {
    return this.transactionSharedService.checkIfUserExists(transaction.counterparty).pipe(
      concatMap((userExists) => {
          if (!userExists){
            console.log('user dont exist');
            return of(null);
          }
          console.log('user exists');
          return this.http.post<TransactionResponseDTO>(API_URL.TRANSACTION_STEP1_CREATE_TRANSACTION,transaction);
      })
    )
  }
}
