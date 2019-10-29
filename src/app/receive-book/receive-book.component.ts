import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { All } from '../app.service';
import { Subscription } from 'rxjs';
import { Books } from '../books.model';
import { PageEvent } from '@angular/material';
import { ReceiveReg } from '../receiveReg.model';

@Component({
  selector: 'app-receive-book',
  templateUrl: './receive-book.component.html',
  styleUrls: ['./receive-book.component.css']
})
export class ReceiveBookComponent implements OnInit , OnDestroy {
  totalPosts = 0;
  postsPerPage = 10;
  number = 0;
  currentPage = 1;
pageSizeOption = [ 5, 10, 20, 30, 50, 100];
isLoading = false;
books: Books[] = [];
gotbook: Books;
today;
date;
private booksub: Subscription;
  constructor(private app: All) { }
onSubmit2(form2: NgForm) {
  this.isLoading = true;
  const toRecBook: ReceiveReg = { ...this.gotbook , Note: form2.value.Note , receive_date: this.date, fine: form2.value.fine};
  this.app.UpdateRecReg(toRecBook)
  .subscribe(() => {
    this.gotbook.borrow_date = '';
    this.gotbook.cardNo = null;
    this.gotbook.borrowed = false;
    this.gotbook.borrower = '';
    this.app.receiveOne(this.gotbook)
    .subscribe(() => {
      this.app.getAllIssuedBooks(this.postsPerPage , this.currentPage);
    });
  });
}

onSubmit(form: NgForm) {
  console.log(form);
}
getbook(id: string) {
this.gotbook = this.books.find(b => b._id === id);
}

onChange(PageData: PageEvent) {
  this.isLoading = true;
  this.currentPage = PageData.pageIndex + 1;
  this.postsPerPage = PageData.pageSize;
  this.app.getAllIssuedBooks(this.postsPerPage , this.currentPage);
  if (this.currentPage > 1 ) {
this.number = this.postsPerPage * PageData.pageIndex;
  } else {
    this.number = 0;
  }

  }


  ngOnInit() {
    this.today = new Date();
    this.date = this.today.getFullYear() + '-' + (this.today.getMonth() + 1) + '-' + this.today.getDate();
    this.app.getAllIssuedBooks(this.postsPerPage , this.currentPage);
    this.isLoading = true;
    this.booksub = this.app.getBooksUpdateListener()
    .subscribe(( bookData: {BOOKS: Books[], count: number }) => {
this.books = bookData.BOOKS;
this.totalPosts = bookData.count;
this.isLoading = false;
    });
  }

ngOnDestroy() {
  this.booksub.unsubscribe();
}

}
