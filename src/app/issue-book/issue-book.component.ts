import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { All } from '../app.service';
import { Libcard } from '../Libcard.model';
import { Books } from '../books.model';
import { Subscription } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-issue-book',
  templateUrl: './issue-book.component.html',
  styleUrls: ['./issue-book.component.css']
})
export class IssueBookComponent implements OnInit, OnDestroy {
Libcard: Libcard;
Books: Books[] = [];
Books2: Books[] = [];
today;
date;
lengthOfBooks = 0;
isLoading = false;
private bookSub: Subscription;
private userSub: Subscription;
  constructor(private app: All) { }
onSubmit(form: NgForm) {
  if (form.valid === true ) {
    this.isLoading = true;
    this.app.getUser(form.value.cardNo);
  }

}

onSubmits(form: NgForm) {
  if (form.valid === true) {
    this.isLoading = true;
    this.app.getBook(form.value.accession_no)
    .subscribe(result => {
      if ( result.book.length > 0) {
      if ( !this.Books.find(m => m.accession_no === result.book[0].accession_no)) {
  this.Books2.push(result.book[0]);
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

}

resetform2(form: NgForm) {
  form.reset();
  this.Books2 = [];
}
resetform(form: NgForm) {
  form.reset();
  this.app.resetuser();
  this.app.resetbooks();

}
onIssue(form: NgForm) {

  if ( this.Libcard && this.Books2.length > 0 ) {
    this.isLoading = true;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.Books2.length; i++ ) {
      console.log(this.Libcard.cardNo);
      console.log(this.Books2[i].cardNo);
      if (this.Books2[i].borrowed === true) {
        this.isLoading = false;
        alert('Some Books Are Already Issued To Others');

        this.isLoading = false;
        this.Books2 = [];
        return;
      }
    }
          // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.Books2.length; i++ ) {
            if (this.Books2[i].borrowed !== true) {
            this.Books2[i].borrower = this.Libcard.fname + ' ' + this.Libcard.lname;
            this.Books2[i].cardNo = this.Libcard.cardNo;
            this.Books2[i].borrowed = true;
            this.Books2[i].borrow_date = this.date;
            this.Books2[i].borrower_email = this.Libcard.email;
            this.Books2[i].borrower_phone = this.Libcard.phone_no;
            this.Books2[i].borrower_dept = this.Libcard.dept;
            this.app.issueBook(this.Books2[i])
            .subscribe(() => {

              this.app.resetuser();
              this.app.resetbooks();
              this.Books2 = [];
              this.Books = [];
              this.isLoading = false;
              form.reset();
            });
            }
          }
    alert('Book Issued');
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
      if (this.Libcard) {
        this.Books = response.BOOKS;
        this.lengthOfBooks = response.BOOKS.length;
      }
      this.isLoading = false;
    });


  }
  ngOnDestroy() {
    this.app.resetuser();
    this.app.resetbooks();
    this.Books2 = [];
    this.isLoading = false;
    this.bookSub.unsubscribe();
    this.userSub.unsubscribe();
  }

}
