import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Transaction } from '../../dto/transaction-request.dto';
import { API_URL } from '../../constant/api.constant';
import { TransactionResponseDTO } from '../../dto/transaction-response.dto';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GameResponseDTO } from '../../dto/game-response.dto';

@Injectable({
  providedIn: 'root'
})
export class TransactionSharedService {
  transaction!: TransactionResponseDTO;

  constructor(private http: HttpClient, private router: Router) { }

  checkIfUserExists(username: string): Observable<boolean>{
    const httpParams = new HttpParams().set('username',username);
    return this.http.get<boolean>(API_URL.CHECK_IF_USER_EXISTS,{params:httpParams});
  }

  getAllTransactionsByUser(username: string){
    const httpParams = new HttpParams().set('username',username);
    return this.http.get<TransactionResponseDTO[]>(API_URL.GET_ALL_TRANSACTION_BY_USER, {params: httpParams});
  }

  getTransactionByTransactionID(transactionID: string){
    const httpParams = new HttpParams().set('transactionID', transactionID);
    return this.http.get<TransactionResponseDTO>(API_URL.GET_TRANSACTION_BY_TRANSACTION_ID, {params:httpParams}); 
  }

  getAllGames(): Observable<GameResponseDTO[]> {
    return this.http.get<GameResponseDTO[]>(API_URL.GET_ALL_GAMES);
  }

  
}
