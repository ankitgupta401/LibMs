import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from './login.service';
import { format } from 'util';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-logincomp',
  templateUrl: './logincomp.component.html',
  styleUrls: ['./logincomp.component.css']
})
export class LogincompComponent implements OnInit , OnDestroy {

  constructor(public loginService: LoginService ) { }
isLoading = true;
private loginsub: Subscription;
onLogin(loginForm: NgForm) {
if (loginForm.invalid) {
return ;
} else {
  this.isLoading = true;
  this.loginService.login(loginForm.value.email, loginForm.value.password);
}
}
  ngOnInit() {
    this.isLoading = false;
    this.loginsub = this.loginService.getisAuthListner()
    .subscribe(() => {
      this.isLoading = false;
    });
  }
  forgot() {
this.isLoading = true;
this.loginService.resetPass()
.subscribe(postData => {
  this.isLoading = false;
  alert(postData.message);
    });
  }

ngOnDestroy() {
this.loginsub.unsubscribe();
}

}
