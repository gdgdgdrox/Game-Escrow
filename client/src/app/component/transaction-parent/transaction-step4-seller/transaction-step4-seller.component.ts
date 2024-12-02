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
    setTimeout(() => {
      this.websocketService.subscribeToStep4Topic(
        this.transaction.transactionID,
        (TransactionResponseDTO) =>
          this.onMessageReceived(TransactionResponseDTO)
      );
    }, 3000);
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

      this.transactionStep4Service.sellerUploadEvidence(this.transaction.transactionID,formData)
        .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total) {
            this.uploadProgress = Math.round((event.loaded / event.total) * 100);
          }
        } else if (event.type === HttpEventType.Response) {
          console.log('File uploaded successfully!', event.body);
        }
      });
    }
}}
