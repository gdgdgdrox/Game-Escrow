import { Component, Input, OnInit } from '@angular/core';
import { TransactionResponseDTO } from '../../../dto/transaction-response.dto';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-transaction-step4-completed',
  standalone: true,
  imports: [],
  templateUrl: './transaction-step4-completed.component.html',
  styleUrl: './transaction-step4-completed.component.css'
})
export class TransactionStep4CompletedComponent implements OnInit{
  @Input() transaction!: TransactionResponseDTO;
  userID!: string;

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.userID = this.authService.getLoggedInUsername()!;
  }
}
