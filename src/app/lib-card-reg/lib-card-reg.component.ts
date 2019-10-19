import { Component, OnInit , OnDestroy} from '@angular/core';
import { NgForm } from '@angular/forms';
import { All } from '../app.service';
import { Libcard } from '../Libcard.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lib-card-reg',
  templateUrl: './lib-card-reg.component.html',
  styleUrls: ['./lib-card-reg.component.css']
})
export class LibCardRegComponent implements OnInit, OnDestroy {
LibCards: Libcard[] = [];
gotcard: Libcard;
carddel: string;
year = 2019;
private userSub: Subscription;
  constructor(private app: All) {
  }
onSubmit(form: NgForm ) {

}
  ngOnInit() {
    this.app.getUsers();
    this.userSub = this.app.getUsersUpdateListener()
      .subscribe((users: Libcard[]) => {
        this.LibCards = users;
      });
  }
onDelete(id: string) {
this.app.DeleteUser(id);
}
onPrint(id: string) {

// tslint:disable-next-line: prefer-for-of
for (let i = 0; i < this.LibCards.length; i++) {
 if (this.LibCards[i]._id === id) {
   this.gotcard = this.LibCards[i];
 }
}
}
getCard(id: string) {
this.carddel = id;

}
 ngOnDestroy() {
this.userSub.unsubscribe();
}
}
