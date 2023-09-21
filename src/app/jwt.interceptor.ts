import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   // add authorization header with jwt token if available
  //   let jwt = localStorage.getItem('jwt');

  //   if (jwt !== null) { // Vérifiez si jwt n'est pas null
  //     request = request.clone({
  //       setHeaders: {
  //         Authorization: `Bearer ${jwt}`
  //       }
  //     });
  //   }

  //   return next.handle(request);
  // }
  constructor(private authService: AuthService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.authService.getToken();
        req = req.clone({
            setHeaders: {
                Authorization: "Bearer " + authToken
            }
        });
        return next.handle(req);
    }
}

