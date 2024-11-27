import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionResponseDTO } from '../../dto/transaction-response.dto';
import { API_URL } from '../../constant/api.constant';

@Injectable({
  providedIn: 'root'
})
export class TransactionStep3Service {

  constructor(private http: HttpClient) { }

  moneyTransferred(transactionID: string): Observable<TransactionResponseDTO>{
    return this.http.put<TransactionResponseDTO>((`${API_URL.TRANSACTION_STEP3_MONEY_TRANSFERRED}/${transactionID}/transferred`), {});

  }
}
