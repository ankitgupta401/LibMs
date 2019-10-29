import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { All } from '../app.service';
import { Libcard } from '../Libcard.model';
import { Books } from '../books.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-issue-book',
  templateUrl: './issue-book.component.html',
  styleUrls: ['./issue-book.component.css']
})
export class IssueBookComponent implements OnInit, OnDestroy {
Libcard: Libcard;
Books: Books[] = [];
today;
date;
isLoading = false;
private bookSub: Subscription;
private userSub: Subscription;
  constructor(private app: All) { }
onSubmit(form: NgForm) {
  this.isLoading = true;
  this.app.getUser(form.value.cardNo);

}

onSubmits(form: NgForm) {
  this.isLoading = true;
  this.app.getBook(form.value.accession_no)
  .subscribe(result => {
    if ( result.book.length > 0) {
    if ( !this.Books.find(m => m.accession_no === result.book[0].accession_no)) {
this.Books.push(result.book[0]);
this.isLoading = false;
} else {
  this.isLoading = false;
  alert('Already Exists');

}
    this.isLoading = false;
} else {
  this.isLoading = false;
  alert('Not a Book');

}
});
}

resetform2(form: NgForm) {
  this.isLoading = true;
  const cardNo = this.Libcard.cardNo;
  form.reset();
  this.app.resetbooks();

  this.app.getUser(cardNo);
}
resetform(form: NgForm) {
  this.isLoading = true;
  const cardNo = this.Libcard.cardNo;
  form.reset();
  this.app.resetuser();
  this.app.resetbooks();

}
onIssue(form: NgForm) {
  this.isLoading = true;
  let isIssued = false;
  if ( this.Libcard && this.Books.length > 0 ) {
// tslint:disable-next-line: prefer-for-of
for (let i = 0; i < this.Books.length; i++ ) {
if (this.Books[i].borrowed !== true) {
this.Books[i].borrower = this.Libcard.fname + ' ' + this.Libcard.lname;
this.Books[i].cardNo = this.Libcard.cardNo;
this.Books[i].borrowed = true;
this.Books[i].borrow_date = this.date;
this.app.issueBook(this.Books[i])
.subscribe(() => {
this.app.resetuser();
this.app.resetbooks();
this.isLoading = false;
form.reset();
});

} else {
  if (this.Books[i].cardNo !== this.Libcard.cardNo) {
  isIssued = true;
}
}
}
}
  if (isIssued ) {
    this.isLoading = false;
    alert('Some Books Are Already Issued To Others');

} else {
 alert('Book issued!');
 this.isLoading = false;
}
}

  ngOnInit() {
     this.today = new Date();
     this.date = this.today.getFullYear() + '-' + (this.today.getMonth() + 1) + '-' + this.today.getDate();
     this.userSub = this.app.getUsersUpdateListener().
    subscribe((UserData) => {
      this.Libcard = UserData.LibCard[0];
      this.isLoading = false;
    });
     this.bookSub = this.app.getBooksUpdateListener()
    .subscribe(response => {
      this.Books = response.BOOKS;
      this.isLoading = false;
    });


  }
  ngOnDestroy() {
    this.bookSub.unsubscribe();
    this.userSub.unsubscribe();
  }

}
