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
gotcard: Libcard = null;
carddel: string;
isLoading = false;
image = 'assets/icons/admin.png';
year = 2019;
private userSub: Subscription;
  constructor(private app: All) {
  }
onSubmit(form: NgForm ) {

}
  ngOnInit() {
    this.isLoading = true;
    this.app.getUsers();
    this.userSub = this.app.getUsersUpdateListener()
      .subscribe((users: Libcard[]) => {
        this.LibCards = users;
        this.isLoading = false;
      });
  }
onDelete(id: string) {
this.app.DeleteUser(id);
this.isLoading = true;
this.app.getUsersUpdateListener().subscribe(() => {
this.isLoading = false;
});
}
onPrint(id: string) {

// tslint:disable-next-line: prefer-for-of
for (let i = 0; i < this.LibCards.length; i++) {
 if (this.LibCards[i]._id === id) {
   this.gotcard = this.LibCards[i];
   this.image = this.LibCards[i].imagePath;
 }
}
}
getCard(id: string) {
this.carddel = id;
}
 ngOnDestroy() {
this.userSub.unsubscribe();
}


printPreview() {
  window.print();
}
onSubmitForm(form: NgForm) {

  this.gotcard.fname = form.value.fname;
  this.gotcard.lname = form.value.lname;
  this.gotcard.email = form.value.email;
  this.gotcard.Roll = form.value.Roll;
  this.gotcard.dept = form.value.dept;
  this.gotcard.year = form.value.year;
  this.gotcard.sem = form.value.sem;
  this.gotcard.phone_no = form.value.phone_no;
  this.gotcard.address = form.value.address;
  this.gotcard.city = form.value.city;
  this.gotcard.state = form.value.state;
  this.gotcard.zip = form.value.zip;
  this.gotcard.imagePath = this.gotcard.imagePath;
  this.gotcard.cardNo = this.gotcard.cardNo;
  this.app.updateUser(this.gotcard);
  this.isLoading = true;
  this.app.getUsersUpdateListener()
  .subscribe(() => {
  this.isLoading = false;
  });
}

getCardedit(id: string) {
this.gotcard = this.app.getCard(id);
}

}
