import { HttpInterceptorFn } from '@angular/common/http';
import { API_URL } from '../constant/api.constant';
const endpointsThatRequireAuthentication = [
  API_URL.GET_ALL_GAMES,
  API_URL.CREATE_TRANSACTION
];

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  if (endpointsThatRequireAuthentication.includes(req.url)){
    const jwt = localStorage.getItem('jwt');
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${jwt}`)
    })
    console.log('added jwt to request header');
  }
  return next(req);
};
