import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../logincomp/login.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit , OnDestroy {
Admin = 'S.G.P Admin';
isAuthenticated: boolean;
  constructor(private isLoggedin: LoginService) { }
private isAuthSub: Subscription;
  ngOnInit() {
    this.isAuthenticated = this.isLoggedin.getIsAuth();
    this.isAuthSub = this.isLoggedin.getisAuthListner()
    .subscribe(result => {
this.isAuthenticated = result;
    });
  }

onLogout() {
  this.isLoggedin.logout();
}

ngOnDestroy() {
this.isAuthSub.unsubscribe();
}

}
