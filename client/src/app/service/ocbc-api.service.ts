import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OCBCApiService {
  private PAYNOW_QR_API = 'https://api.ocbc.com:443/transactional/paynowqr/1.0/payNowQR';

  constructor(private http: HttpClient) { }

  getQR(): Observable<any> {
    // get token from ocbc api website and replace the placeholder
    const header = new HttpHeaders().set('Authorization', 
      'Bearer placeholder'
      );
    const requestBody = {
      'ProxyType': 'NRIC',
      'ProxyValue': 'S1234567Z',
      'Amount': 1,
      'ReferenceText': 'test',
      'QRCodeSize': 100,
      'ExpiryDate': '20241111'
    };
    return this.http.post(this.PAYNOW_QR_API, requestBody, {headers: header} );
  }

}
