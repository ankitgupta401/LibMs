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
area = document.getElementById('success_msg');
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
  document.getElementById('success_msg').style.display = 'none';
  this.Books = [];
  this.Books2 = [];
  this.app.resetuser();
  this.app.resetbooks();
  if (form.valid === true ) {
    this.isLoading = true;
    this.app.getUser(form.value.cardNo);
  }

}

onSubmits(form: NgForm) {
if (!this.Libcard) {
  document.getElementById('success_msg').style.color = 'red';
  document.getElementById('success_msg').innerHTML = 'Please Enter Card No. To Add Books';
  document.getElementById('success_msg').style.display = 'block';
  return;
}
let issuedBookLength;
document.getElementById('success_msg').style.display = 'none';
if (form.valid === true) {
    this.isLoading = true;
    this.app.getBook(form.value.accession_no)
    .subscribe(result => {
      if ( result.book.length > 0) {
      if ( !this.Books.find(m => m.accession_no === result.book[0].accession_no)
       && !this.Books2.find(m => m.accession_no === result.book[0].accession_no)) {
         if (result.book[0].borrowed) {
          document.getElementById('success_msg').innerHTML = 'This Book Already Issued To Someone Else';
          document.getElementById('success_msg').style.color = 'red';
          document.getElementById('success_msg').style.display = 'block';
          this.isLoading = false;
          return;

         }
         this.Books2.push(result.book[0]);
         this.isLoading = false;
         issuedBookLength = this.Books.length + this.Books2.length;
         if (issuedBookLength >= 3) {
    this.isLoading = false;
    document.getElementById('warning_msg').innerHTML = 'Warning!!! This User Has Already Added/Issued '
    + ' ' + issuedBookLength + ' ' + ' Books';
    document.getElementById('warning_msg').style.display = 'block';
  }
  } else {
    this.isLoading = false;
    document.getElementById('success_msg').innerHTML = 'This Book Already Exists In The List';
    document.getElementById('success_msg').style.color = 'red';
    document.getElementById('success_msg').style.display = 'block';
  }
      this.isLoading = false;
  } else {
    this.isLoading = false;
    document.getElementById('success_msg').innerHTML = 'This Accession No. Does Not Match With Any book!';
    document.getElementById('success_msg').style.color = 'red';
    document.getElementById('success_msg').style.display = 'block';
  }
  });
  }

}

resetform2(form: NgForm) {

  form.reset();
  this.Books2 = [];
  document.getElementById('success_msg').style.display = 'none';
  document.getElementById('warning_msg').style.display = 'none';
}
resetform(form: NgForm) {
  form.reset();
  this.Books = [];
  this.Books2 = [];
  this.Libcard = undefined;
  this.app.resetuser();
  this.app.resetbooks();
  document.getElementById('success_msg').style.display = 'none';
  document.getElementById('warning_msg').style.display = 'none';
}
onIssue(form: NgForm) {
  document.getElementById('success_msg').style.display = 'none';
  if ( this.Libcard && this.Books2.length > 0 ) {
    this.isLoading = true;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.Books2.length; i++ ) {
      if (this.Books2[i].borrowed === true) {
        this.isLoading = false;
        document.getElementById('success_msg').style.color = 'red';
        document.getElementById('success_msg').innerHTML =  'Some Books Are Already Issued To Others';
        document.getElementById('success_msg').style.display = 'block';

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
    document.getElementById('success_msg').style.color = 'rgb(25, 247, 62)';
    document.getElementById('success_msg').innerHTML =  'The Selected Books Were Successfully Issued';
    document.getElementById('success_msg').style.display = 'block';
  } else {
    document.getElementById('success_msg').style.color = 'red';
    document.getElementById('success_msg').innerHTML =  'Please Make Sure You Have Added Some Books!';
    document.getElementById('success_msg').style.display = 'block';
    return ;
  }
}

  ngOnInit() {
     this.today = new Date();
     this.date = this.today.getDate() + '-' + (this.today.getMonth() + 1) + '-' +  this.today.getFullYear();
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
