import { Injectable } from '@angular/core';
import { TransactionResponseDTO } from '../dto/transaction-response.dto';

@Injectable({
  providedIn: 'root'
})
export class TransactionStateService {
  transaction: TransactionResponseDTO | null = null;
  constructor() { }
}
