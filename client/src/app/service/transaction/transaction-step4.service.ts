import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../../constant/api.constant';
import { TransactionResponseDTO } from '../../dto/transaction-response.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionStep4Service {
  constructor(private http: HttpClient) {}

  buyerConfirmItemReceived(
    transactionID: string
  ): Observable<TransactionResponseDTO> {
    return this.http.put<TransactionResponseDTO>(
      `${API_URL.TRANSACTION_STEP4_BUYER_CONFIRM_ITEM_RECEIVED}/${transactionID}/buyer`,
      {}
    );
  }

  sellerUploadEvidence(transactionID: string, formData: FormData): Observable<TransactionResponseDTO> {
    return this.http.post<TransactionResponseDTO>(
      `${API_URL.TRANSACTION_STEP4_SELLER_UPLOAD_EVIDENCE}/${transactionID}/seller`,
      formData,
    );
  }
}
