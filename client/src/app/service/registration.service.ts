import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../constant/api.constant';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<HttpResponse<string>>{
    console.log('registration service making api call..');
    console.log(API_URL.REGISTRATION);
    return this.http.post<string>(API_URL.REGISTRATION, user, {observe: 'response', responseType: 'text' as 'json'});
  }
}