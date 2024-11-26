import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Transaction } from '../../dto/transaction-request.dto';
import { API_URL } from '../../constant/api.constant';
import { TransactionResponseDTO } from '../../dto/transaction-response.dto';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  transaction!: TransactionResponseDTO;

  constructor(private http: HttpClient, private router: Router) { }

  getAllTransactionsByUser(username: string){
    const httpParams = new HttpParams().set('username',username);
    return this.http.get<TransactionResponseDTO[]>(API_URL.GET_ALL_TRANSACTION_BY_USER, {params: httpParams});
  }

  // getTransactionByTransactionID(transactionID: string){
  //   const httpParams = new HttpParams().set('transactionID', transactionID);
  //   this.http.get<TransactionEntity>(API_URL.GET_TRANSACTION_BY_TRANSACTION_ID, {params:httpParams})
  //   .subscribe({
  //     next: (response:TransactionEntity) => {
  //       console.log(response);
  //       this.transaction = response as TransactionEntity;
  //       this.router.navigate(['/transaction-parent'])
  //     },
  //     error: (error: HttpErrorResponse) => {
  //       console.error(error);
  //     },
  //   });
  // }

  getTransactionByTransactionID(transactionID: string){
    const httpParams = new HttpParams().set('transactionID', transactionID);
    return this.http.get<TransactionResponseDTO>(API_URL.GET_TRANSACTION_BY_TRANSACTION_ID, {params:httpParams});
    
  }

  
}
