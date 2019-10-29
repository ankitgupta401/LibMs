import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminModel } from './admin.model';
@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(private http: HttpClient) {}
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
    this.http.post('http://localhost:3000/api/admin/login' , admin)
    .subscribe(response => {
      // console.log(response);
    });
  }
}
