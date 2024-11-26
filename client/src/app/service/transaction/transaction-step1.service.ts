import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GameResponseDTO } from '../../dto/game-response.dto';
import { Observable } from 'rxjs';
import { API_URL } from '../../constant/api.constant';
import { TransactionRequestDTO } from '../../dto/transaction-request.dto';
import { TransactionResponseDTO } from '../../dto/transaction-response.dto';

@Injectable({
  providedIn: 'root',
})
export class TransactionStep1Service {
  constructor(private http: HttpClient) {}

  getAllGames(): Observable<GameResponseDTO[]> {
    return this.http.get<GameResponseDTO[]>(API_URL.GET_ALL_GAMES);
  }

  createNewTransaction(
    transaction: TransactionRequestDTO
  ): Observable<TransactionResponseDTO> {
    return this.http.post<TransactionResponseDTO>(
      API_URL.CREATE_TRANSACTION,
      transaction
    );
  }
}
