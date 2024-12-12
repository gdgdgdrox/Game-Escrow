import { Component, Input, OnInit } from '@angular/core';
import { TransactionResponseDTO } from '../../../dto/transaction-response.dto';
import { WebsocketService } from '../../../service/websocket.service';
import { TransactionStateService } from '../../../service/transaction-state.service';
import { Router } from '@angular/router';
import { TransactionStep4Service } from '../../../service/transaction/transaction-step4.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { finalize } from 'rxjs/internal/operators/finalize';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction-step4-seller',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatProgressSpinnerModule, CommonModule],
  templateUrl: './transaction-step4-seller.component.html',
  styleUrl: './transaction-step4-seller.component.css',
})
export class TransactionStep4SellerComponent implements OnInit {
  @Input() transaction!: TransactionResponseDTO;
  selectedFile: File | null = null;
  // message: string | null = null;
  isUploading = false;
  fileUploadSuccess = false;
  fileUploadStatusMessage = '';
  isFileAlreadyUploaded = false;

  constructor(
    private websocketService: WebsocketService,
    private transactionStateService: TransactionStateService,
    private router: Router,
    // private http: HttpClient,
    private transactionStep4Service: TransactionStep4Service
  ) {}

  ngOnInit(): void {
    console.log('step 4 seller init');
    this.websocketService.connect();
    const topic = `/topic/transaction/step4/${this.transaction.transactionID}`;
    this.websocketService.subscribeToTopic(
      topic,
      (TransactionResponseDTO) => this.onMessageReceived(TransactionResponseDTO)
    );
    if (
      this.transaction &&
      this.transaction.transactionSteps.transactionStep4.sellerPhotoUploaded
    ) {
      this.isFileAlreadyUploaded = true;
      this.fileUploadStatusMessage = 'File uploaded!';
    }
  }

  onMessageReceived(transaction: TransactionResponseDTO): void {
    console.log('received notification that buyer has received item');

    if (transaction.transactionSteps.transactionStep4.status === 'completed') {
      // this.message = `${transaction.buyer} has received the item!`;
      setTimeout(() => {
        this.transactionStateService.transaction = transaction;
        console.log('shared service state updated. navigating to parent');
        this.router.navigate([
          '/transaction-parent',
          `step${transaction.currentStep}`,
          transaction.transactionID,
        ]);
      }, 3000);
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadFile(): void {
    if (this.selectedFile) {
      this.isUploading = true;
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.transactionStep4Service
        .sellerUploadEvidence(this.transaction.transactionID, formData).pipe(
          finalize(() => {
            this.isUploading = false;
          }))
        .subscribe({
          next: (transaction: TransactionResponseDTO) => {
            console.log(
              transaction.transactionSteps.transactionStep4
                .sellerPhotoEvidenceS3Key
            );
            if (
              transaction.transactionSteps.transactionStep4.sellerPhotoUploaded
            ) {
              this.isFileAlreadyUploaded = true;
              this.fileUploadSuccess = true;
              this.fileUploadStatusMessage = 'File uploaded!';
            }
          },
          error: (error: HttpErrorResponse) => {
            console.error(error);
            this.isUploading = false;
            this.isFileAlreadyUploaded = false;
            this.fileUploadStatusMessage = 'Upload failed. Please try again later.';
          }
        });
    }
  }
}
