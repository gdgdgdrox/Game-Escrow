import { Component, Input, OnInit } from '@angular/core';
import { TransactionResponseDTO } from '../../../dto/transaction-response.dto';
import { WebsocketService } from '../../../service/websocket.service';
import { TransactionStateService } from '../../../service/transaction-state.service';
import { Router } from '@angular/router';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { TransactionStep4Service } from '../../../service/transaction/transaction-step4.service';

@Component({
  selector: 'app-transaction-step4-seller',
  standalone: true,
  imports: [],
  templateUrl: './transaction-step4-seller.component.html',
  styleUrl: './transaction-step4-seller.component.css',
})
export class TransactionStep4SellerComponent implements OnInit {
  @Input() transaction!: TransactionResponseDTO;
  selectedFile: File | null = null;
  uploadProgress: number = 0;
  message: string | null = null;
  fileUploadMessage = '';
  isFileAlreadyUploaded: boolean = false;

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
      this.isFileAlreadyUploaded =
        this.transaction.transactionSteps.transactionStep4.sellerPhotoUploaded;
      this.fileUploadMessage = 'upload success!';
    }
  }

  onMessageReceived(transaction: TransactionResponseDTO): void {
    console.log('received notification that buyer has received item');

    if (transaction.transactionSteps.transactionStep4.status === 'completed') {
      this.message = `${transaction.buyer} has received the item!`;
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
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.transactionStep4Service
        .sellerUploadEvidence(this.transaction.transactionID, formData)
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
              this.fileUploadMessage = 'upload success!';
            }
          },
        });
    }
  }
}
