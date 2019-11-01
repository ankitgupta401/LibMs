import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Barcode } from './barcode.service';
import { All } from './app.service';
import { LoginService } from './logincomp/login.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
providers: [Barcode, All]

})
export class AppComponent implements OnInit , OnDestroy {
  title = 'Libms';
  isAuthenticated = false;
  isLoading: false;
  private isAuthSub: Subscription;
  onOpen = 0;
  open = true;
  toggle(): void {
    if (this.onOpen === 0) {
       this.onOpen = 1;
       this.open = false;
    } else {
      this.onOpen = 0;
      this.open = true;
    }

  }

constructor(private bar: Barcode, private isAuth: LoginService) {}
ngOnInit() {
this.isAuth.autoAuthUser();
this.isAuthenticated = this.isAuth.getIsAuth();
this.isAuthSub = this.isAuth.getisAuthListner()
.subscribe(result => {
  this.isAuthenticated = result;
});
}

ngOnDestroy() {
this.isAuthSub.unsubscribe();
}
}


