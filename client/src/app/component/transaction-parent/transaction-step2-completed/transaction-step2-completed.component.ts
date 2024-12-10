import { Component, Input, OnInit } from '@angular/core';
import { TransactionResponseDTO } from '../../../dto/transaction-response.dto';
import { AuthService } from '../../../service/auth.service';
import {MatIconModule} from '@angular/material/icon';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-transaction-step2-completed',
  standalone: true,
  imports: [MatIconModule,DatePipe],
  templateUrl: './transaction-step2-completed.component.html',
  styleUrl: './transaction-step2-completed.component.css'
})
export class TransactionStep2CompletedComponent implements OnInit{
  @Input() transaction!: TransactionResponseDTO;
  userID!: string;

  constructor(private authService: AuthService){}
  
  ngOnInit(): void {
    this.userID = this.authService.getLoggedInUsername()!;
  }

}
