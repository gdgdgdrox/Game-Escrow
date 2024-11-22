import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private router: Router, private authService: AuthService){}

  startTrade(): void{
    console.log('user clicked trade button');
    if (this.authService.isLoggedIn()){
      console.log('user is logged in. navigating to transaction parent');
      this.router.navigateByUrl('/transaction-parent');
    }
    else{
      console.log('user is not logged in. navigating to login page');
      this.router.navigateByUrl('/login');
    }
  }
}
