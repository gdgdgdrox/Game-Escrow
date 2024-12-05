import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

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
