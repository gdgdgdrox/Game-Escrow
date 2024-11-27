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
    // to hide token
    const header = new HttpHeaders().set('Authorization', 
      'Bearer eyJ4NXQiOiJOREU1WXpjeFpEbGlNV1F6TXprd1ltVTJOekptWXpVMU5XRXhOVFkzWVRFME1EUm1OalE0WXciLCJraWQiOiJZVFJsTVRWbU16TTNNR1V6TVRsak4yTTFNamRtWlRCak5Ua3pNV0V4T0RjNE56VXlaVGd4WlRKallqWmlOek16WldRM1ltWXpNR1U0WTJGa01qa3hOZ19SUzI1NiIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJnZGdkZ2Ryb3giLCJhdXQiOiJBUFBMSUNBVElPTiIsImF1ZCI6IkNaVG1Bc1NCdWlZcjRWaXVmR1VST1JlckdLMGEiLCJuYmYiOjE3MzI2ODIzMDQsImF6cCI6IkNaVG1Bc1NCdWlZcjRWaXVmR1VST1JlckdLMGEiLCJzY29wZSI6ImRlZmF1bHQiLCJpc3MiOiJodHRwczpcL1wvYXBpLm9jYmMuY29tXC9vYXV0aDJcL3Rva2VuIiwiZXhwIjoxNzMyNjgzMjA0LCJpYXQiOjE3MzI2ODIzMDQsImp0aSI6ImMyM2ZkMGM1LWMxOTUtNGY4Ny04ODQ5LTQ4MmU2MmNhZGFmZCJ9.YAlpIw0yQhUfo2LZd5rZmSrqHwxNJ-xMwt6nhrXwdCK7ZwViLSTTyqnqbzw625eAQ6BD_iJgC8E2O6WdzUBTyMxUJlOsOrxlLxwRB-LPQbiSz4MqmlUx2n0vzZ_2dPpN1tbG4s_d2INCa6GntajFLq4A6ghS_8Z6qWXtZkFCSSLASO1MjPPjpk1H2s7U9MZ2dVn7EXpuMO2xHm4VLtHxISpXvXzJJ7rh-22pR7X18oBcZZ0kiPbJ9bei5l8m9LuOGCZA3HoLG8TXoP_xHqKdMmWswmHK_6Ik83nCOGlfkaO20_FxdOAUGWuzzuLXLuY2yYbijljOAbkhg2ptEENG0g'
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
