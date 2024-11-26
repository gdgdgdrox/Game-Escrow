import { HttpInterceptorFn } from '@angular/common/http';
import { API_URL } from '../constant/api.constant';
const endpointsThatRequireAuthentication = [
  API_URL.GET_ALL_GAMES,
  API_URL.GET_ALL_TRANSACTION_BY_USER,
  API_URL.GET_TRANSACTION_BY_TRANSACTION_ID,
  API_URL.CREATE_TRANSACTION,
  API_URL.TRANSACTION_STEP2_ACCEPT_TRADE,
  'http://localhost:8080/websocket'
];

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  if (endpointsThatRequireAuthentication.includes(req.url) || req.url.startsWith(API_URL.TRANSACTION_STEP2_ACCEPT_TRADE)){
    const jwt = localStorage.getItem('jwt');
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${jwt}`)
    })
    console.log('added jwt to request header');
  }
  return next(req);
};
