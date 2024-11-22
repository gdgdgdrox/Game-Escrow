import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game } from '../../model/game';
import { Observable } from 'rxjs';
import { API_URL } from '../../constant/api.constant';
import { Transaction } from '../../model/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionStep1Service {

  constructor(private http: HttpClient) { }

  getAllGames(): Observable<Game[]>{
    return this.http.get<Game[]>(API_URL.GET_ALL_GAMES);
  }

  createNewTransaction(transaction: Transaction){
    return this.http.post<any>(API_URL.CREATE_TRANSACTION, transaction);
  }
}
