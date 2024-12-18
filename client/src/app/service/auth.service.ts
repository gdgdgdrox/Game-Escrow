import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { API_URL } from '../constant/api.constant';
import {jwtDecode} from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'jwt';
  private usernameSubject = new BehaviorSubject<string | null>(null);
  public username$ = this.usernameSubject.asObservable();


  constructor(private http: HttpClient, private router: Router) { }

  login(username:string,password:string){
    return this.http.post<string>(API_URL.LOGIN, {username,password}, {observe: 'response', responseType:'text' as 'json'})
    .pipe(tap(response => {
      const jwt = response.body;
      if (jwt){
        this.saveToken(jwt);
        this.usernameSubject.next(this.getLoggedInUsername());
      }
    }))
  }

  saveToken(token:string){
    localStorage.setItem(this.tokenKey,token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  clearToken(): void{
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const jwt = this.getToken();
    if (jwt){
      return this.isTokenExpired(jwt);
    }
    return false;
  }

  isTokenExpired(token:string){
    const decodedJwt = jwtDecode(token);
    const expiresAt = decodedJwt.exp ? decodedJwt.exp * 1000 : null;
    return expiresAt ? Date.now() < expiresAt : false;  
  }

  logout(): void{
    this.clearToken();
    this.usernameSubject.next('');
    this.router.navigate(['/']);
  }

  getLoggedInUsername(): string | null{
    if (this.isAuthenticated()){
      const jwt = this.getToken()!;
      const decodedJwt = jwtDecode(jwt);
      return decodedJwt.sub!;
    }
    return null;
  }
    


}
