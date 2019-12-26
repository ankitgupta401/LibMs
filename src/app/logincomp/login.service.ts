import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AdminModel } from './admin.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { error } from 'util';
@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(private http: HttpClient , private router: Router) {}
 private Token: string;
 private isAuthenticated = false;
 private TokenTimer: any;
 private isCredValid = false;
 private isAuthinticatedListner = new Subject<boolean>();
getisAuthListner() {
  return this.isAuthinticatedListner.asObservable();
}

getToken() {
  return this.Token;
}
getIsAuth() {
  return this.isAuthenticated;
}

createUser(ema: string, pass: string) {
    const adminlogin: AdminModel = {email: ema , password: pass};
    console.log(adminlogin);
    this.http.post('http://localhost:3000/api/admin/create' , adminlogin)
    .subscribe(response => {
      console.log(response);
    });
  }
login(ema: string , pass: string) {
    const admin: AdminModel = {email: ema , password: pass};
    this.http.post<{message: string, token: string, expiresIn: number }>('http://localhost:3000/api/admin/login' , admin)
    .subscribe(response => {
      const token = response.token;
      if ( token !== null ) {
        const expiresIn = response.expiresIn;
        this.TokenTimer = setTimeout(() => {
          this.logout();
        }, expiresIn * 1000);
        this.Token = token;
        this.isAuthinticatedListner.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresIn * 1000);
        console.log(expirationDate);
        this.saveAuthData(token, expirationDate);
        this.router.navigate(['/']);

      }

    }, (err: HttpErrorResponse) => {
       alert('Invalid Credentials!!');
       this.isAuthinticatedListner.next(false);
    });
  }


  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.Token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.isAuthinticatedListner.next(true);
    }
  }
 logout() {
   this.Token = null;
   this.isAuthenticated = false;
   this.isAuthinticatedListner.next(false);
   clearTimeout(this.TokenTimer);
   this.clearAuthData();
   this.router.navigate(['/']);
 }



 private setAuthTimer(duration: number) {
  console.log('Setting timer: ' + duration);
  this.TokenTimer = setTimeout(() => {
    this.logout();
  }, duration * 1000);
}

private saveAuthData(token: string, expirationDate: Date) {
  localStorage.setItem('token', token);
  localStorage.setItem('expiration', expirationDate.toISOString());
}

private clearAuthData() {
  localStorage.removeItem('token');
  localStorage.removeItem('expiration');
}

private getAuthData() {
  const tokens = localStorage.getItem('token');
  const expirationDate = localStorage.getItem('expiration');
  if (!tokens || !expirationDate) {
    return;
  }
  return {
    token: tokens,
    expirationDate: new Date(expirationDate)
  };
}



}
