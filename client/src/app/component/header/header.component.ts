import { Component, OnInit } from '@angular/core';
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
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  loggedInUser: string | null = '';

  constructor(private router: Router, private authService: AuthService){}

  ngOnInit(): void {
    this.authService.username$.subscribe(
      {
        next: (username) => {
          this.loggedInUser = username;
        }
      }
    )
    this.loggedInUser = this.authService.getLoggedInUsername();
  }

  logout(){
    this.authService.logout();
  }
}
