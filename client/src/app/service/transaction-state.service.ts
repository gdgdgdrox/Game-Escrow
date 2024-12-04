import { Injectable } from '@angular/core';
import { TransactionResponseDTO } from '../dto/transaction-response.dto';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../constant/api.constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionStateService {
  transaction: TransactionResponseDTO | null = null;
  constructor(private http: HttpClient) { }

  getLatestTransactionState(transactionID: string): Observable<TransactionResponseDTO>{
    return this.http.get<TransactionResponseDTO>(`${API_URL.GET_TRANSACTION_BY_TRANSACTION_ID}/${transactionID}`);
  }
}
