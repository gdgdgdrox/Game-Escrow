import { HttpInterceptorFn } from '@angular/common/http';
import { API_URL } from '../constant/api.constant';
const endpointsThatRequireAuthentication = [
  API_URL.GET_ALL_GAMES,
  API_URL.GET_ALL_TRANSACTION_BY_USER,
  API_URL.GET_TRANSACTION_BY_TRANSACTION_ID,
  API_URL.CREATE_TRANSACTION,
  'http://localhost:8080/websocket'
];

const dynamicEndpointPrefixes = [
  API_URL.TRANSACTION_STEP2_ACCEPT_TRADE,
  API_URL.TRANSACTION_STEP3_MONEY_TRANSFERRED,
  API_URL.TRANSACTION_STEP4_BUYER_CONFIRM_ITEM_RECEIVED,
  API_URL.TRANSACTION_STEP4_SELLER_UPLOAD_EVIDENCE
];

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const jwt = localStorage.getItem('jwt');
  if (endpointsThatRequireAuthentication.includes(req.url)){
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${jwt}`)
    })
  }
  else if (dynamicEndpointPrefixes.some((prefix) => req.url.startsWith(prefix))) {
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${jwt}`),
    });
  }  
  return next(req);
};
