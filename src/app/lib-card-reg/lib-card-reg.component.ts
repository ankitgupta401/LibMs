import { Component, OnInit , OnDestroy} from '@angular/core';
import { NgForm } from '@angular/forms';
import { All } from '../app.service';
import { Libcard } from '../Libcard.model';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';
import { Books } from '../books.model';


@Component({
  selector: 'app-lib-card-reg',
  templateUrl: './lib-card-reg.component.html',
  styleUrls: ['./lib-card-reg.component.css']
})
export class LibCardRegComponent implements OnInit, OnDestroy {
  totalPosts = 0;
  postsPerPage = 10;
  number = 0;
  currentPage = 1;
pageSizeOption = [ 5, 10, 20, 30, 50, 100];

LibCards: Libcard[] = [];
Books: Books[] = [];
gotcard: Libcard = null;
carddel: string;
isLoading = false;
image = 'assets/icons/admin.png';
year = 2019;
cardNo: number;
dept = '';
private userSub: Subscription;
private BooksSub: Subscription;
  constructor(private app: All) {
  }
onSubmit(form: NgForm ) {
this.isLoading = true;
const isAcc = form.value.eamail;
if (isAcc) {
    this.app.findUserEmail(this.postsPerPage , this.currentPage, form.value.email);
  } else {
    if ( form.value.cardNo ) {
      this.app.getUser(form.value.cardNo);
    } else {
      if ( form.value.phone_no ) {
      this.app.findUserPhone(form.value.phone_no);
      }
    }
  }
}

onClear(form: NgForm) {
this.isLoading = true;
form.reset();
this.app.getUsers(this.postsPerPage , this.currentPage, this.dept);
this.userSub = this.app.getUsersUpdateListener()
      .subscribe((userData: {LibCard: Libcard[], count: number}) => {
        this.LibCards = userData.LibCard;
        this.totalPosts = userData.count;
        this.isLoading = false;
      });
}


  ngOnInit() {
    this.isLoading = true;
    this.app.getUsers(this.postsPerPage , this.currentPage, this.dept);
    this.userSub = this.app.getUsersUpdateListener()
      .subscribe((userData: {LibCard: Libcard[], count: number}) => {
        this.LibCards = userData.LibCard;
        this.totalPosts = userData.count;
        this.isLoading = false;
      });
  }
onDelete(id: string , cardNo: number) {
  this.isLoading = true;
  this.app.getBooksForDelete(cardNo)
  .subscribe((BookData: {message: string, books: Books[]}) => {
    this.Books = BookData.books;
    if (this.Books.length > 0) {
      alert('Cant Delete... Books are issued To this User');
      this.app.getUsers(this.postsPerPage , this.currentPage, this.dept);
      this.isLoading = false;
    } else {
    this.app.DeleteUser(id)
    .subscribe(() => {
    this.app.getUsers(this.postsPerPage , this.currentPage, this.dept);
    this.isLoading = false;
  });

    }
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
getCard(id: string , cardNo: number) {
this.carddel = id;
this.cardNo = cardNo;
}
 ngOnDestroy() {
this.userSub.unsubscribe();

}


printPreview() {
  window.print();
}
onSubmitForm(form: NgForm) {
  this.isLoading = true;
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
}

deptSort(form: NgForm) {
  this.isLoading = true;
  this.dept = form.value.dept;
  this.app.getUsers(this.postsPerPage , this.currentPage, this.dept);
  }



getCardedit(id: string) {
this.gotcard = this.app.getCard(id);
}
onChange(PageData: PageEvent) {
  this.isLoading = true;
  this.currentPage = PageData.pageIndex + 1;
  this.postsPerPage = PageData.pageSize;
  this.app.getUsers(this.postsPerPage , this.currentPage, this.dept);
  if ( this.currentPage > 1) {
    this.number = this.postsPerPage;
    console.log(this.number);
  } else {
    this.number = 0;
  }
  }
}
