import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from './login.service';
import { format } from 'util';
@Component({
  selector: 'app-logincomp',
  templateUrl: './logincomp.component.html',
  styleUrls: ['./logincomp.component.css']
})
export class LogincompComponent implements OnInit {

  constructor(public loginService: LoginService ) { }
isLoading = false;
onLogin(loginForm: NgForm) {
if (loginForm.invalid) {
return;
} else {
  this.loginService.login(loginForm.value.email, loginForm.value.password);
}
}
  ngOnInit() {
  }

}
