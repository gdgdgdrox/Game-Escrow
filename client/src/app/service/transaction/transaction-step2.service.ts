import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../../constant/api.constant';
import { TransactionResponseDTO } from '../../dto/transaction-response.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionStep2Service {

  constructor(private http: HttpClient) { }

  acceptTrade(transactionID: string): Observable<TransactionResponseDTO>{
    return this.http.put<TransactionResponseDTO>((`${API_URL.TRANSACTION_STEP2_ACCEPT_TRADE}/${transactionID}/accept`), {});

  }
}
