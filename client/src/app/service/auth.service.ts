import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { API_URL } from '../constant/api.constant';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username:string,password:string){
    return this.http.post<string>(API_URL.LOGIN, {username,password}, {observe: 'response', responseType:'text' as 'json'})
    .pipe(tap(response => {
      const jwt = response.body;
      if (jwt){
        localStorage.setItem('jwt',jwt);
      }
    }))
  }

  isLoggedIn(): boolean{
    const jwt = localStorage.getItem('jwt');
    if (!jwt){
      return false;
    }
    const decodedJwt = jwtDecode(jwt);
    const expiresAt = decodedJwt.exp ? decodedJwt.exp * 1000 : null;
    return expiresAt ? Date.now() < expiresAt : false; 
  }

  logout(): void{
    console.log('logging out');
    localStorage.removeItem('jwt');
  }

  getLoggedInUser(): string{
    const jwt = localStorage.getItem('jwt');
    if (!jwt){
      return '';
    }
    const decodedJwt = jwtDecode(jwt);
    return decodedJwt.sub!;
    
  }


}
