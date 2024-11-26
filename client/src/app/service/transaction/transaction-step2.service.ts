import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../../constant/api.constant';

@Injectable({
  providedIn: 'root'
})
export class TransactionStep2Service {

  constructor(private http: HttpClient) { }

  acceptTrade(transactionID: string){
    return this.http.put<any>((`${API_URL.TRANSACTION_STEP2_ACCEPT_TRADE}/${transactionID}/accept`), {});

  }
}
