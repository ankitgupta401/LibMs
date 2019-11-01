import { HttpInterceptor, HttpRequest } from '@angular/common/http';
import { regExpEscape } from '@ng-bootstrap/ng-bootstrap/util/util';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: LoginService) {}
  intercept(req: HttpRequest<any>, next) {
   const authToken = this.authService.getToken();
   const authRequest = req.clone({
     headers: req.headers.set('Authorization', 'Bearer ' + authToken)
   });
   return next.handle(authRequest);
  }
}
