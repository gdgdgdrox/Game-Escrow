import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';
import { TransactionResponseDTO } from '../../../dto/transaction-response.dto';

@Component({
  selector: 'app-transaction-step2',
  standalone: true,
  imports: [],
  templateUrl: './transaction-step2.component.html',
  styleUrl: './transaction-step2.component.css',
})
export class TransactionStep2Component implements OnInit {
  user!: string;
  @Input()
  transaction!: TransactionResponseDTO;

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.user = this.authService.getLoggedInUser();
    if (!this.user){
      this.router.navigate(['/login']);
    }
    // console.log(object);

  }
}
