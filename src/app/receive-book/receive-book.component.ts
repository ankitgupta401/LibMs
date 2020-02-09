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
  dept = '';
  currentPage = 1;
pageSizeOption = [ 5, 10, 20, 30, 50, 100];
isLoading = false;
books: Books[] = [];
// tslint:disable-next-line: max-line-length

gotbook: Books = null;
today;
date;
email = '';
private booksub: Subscription;
  constructor(private app: All) { }
onSubmit2(form2: NgForm) {
  this.isLoading = true;
  if (form2.value.fine % 1 === 0 && form2.value.fine > '0.00') {
    form2.value.fine = 'Rs' + ' ' + form2.value.fine + '.00';
  } else {
    form2.value.fine = 'Rs ' + ' ' + form2.value.fine;
  }

  const toRecBook: ReceiveReg = { ...this.gotbook , Note: form2.value.Note , receive_date: this.date, fine: form2.value.fine};
  this.app.UpdateRecReg(toRecBook)
  .subscribe(() => {
    this.gotbook.borrow_date = '';
    this.gotbook.cardNo = '';
    this.gotbook.borrowed = false;
    this.gotbook.borrower = '';
    this.gotbook.borrower_dept = '';
    this.app.receiveOne(this.gotbook)
    .subscribe(() => {
      this.app.getAllIssuedBooks(this.postsPerPage , this.currentPage, this.dept);
      document.getElementById('success_msg').style.display = 'block';
    });
  });
}

deptSort(form: NgForm) {
this.isLoading = true;
this.dept = form.value.dept;
this.app.getAllIssuedBooks(this.postsPerPage , this.currentPage, this.dept);

}



onSubmit(form: NgForm) {
  this.isLoading = true;
  const isAcc = form.value.accession_no;
  if (isAcc) {
  this.app.findbookAcc(form.value.accession_no);
  } else {
    if (form.value.cardNo) {
      this.app.findbookCard(this.postsPerPage , this.currentPage, form.value.cardNo);
    } else {
      this.isLoading = false;
    }
  }
}
getbook(id: string) {
this.gotbook = this.books.find(b => b._id === id);
this.email = this.gotbook.borrower_email;
}

onChange(PageData: PageEvent , form: NgForm) {
  this.isLoading = true;
  const isAcc = form.value.accession_no;
  this.currentPage = PageData.pageIndex + 1;
  this.postsPerPage = PageData.pageSize;
  if (isAcc) {
    this.app.findbookAcc(form.value.accession_no);
    return;
    } else {
      if (form.value.cardNo) {
        this.app.findbookCard(this.postsPerPage , this.currentPage, form.value.cardNo);
        return;
      }
    }
  this.app.getAllIssuedBooks(this.postsPerPage , this.currentPage, this.dept);
  if (this.currentPage > 1 ) {
this.number = this.postsPerPage * PageData.pageIndex;
  } else {
    this.number = 0;
  }

  }

  SendEmail(form: NgForm) {

  const area = document.getElementById('success_msg2');
  area.innerHTML = '    Sending Email...';
  area.style.display = 'block';
  this.app.sendEmail(form.value.email, form.value.content)
  .subscribe(postData => {
    area.innerHTML = postData.message;
    area.style.display = 'block';

  }, err => {
    area.innerHTML = err.message;
    area.style.color = 'red';
    area.style.display = 'block';
  });
}
  ngOnInit() {
    this.isLoading = true;
    this.today = new Date();
    this.date =  this.today.getDate() + '-' + (this.today.getMonth() + 1) + '-' + this.today.getFullYear();
    this.app.getAllIssuedBooks(this.postsPerPage , this.currentPage, this.dept);
    this.booksub = this.app.getBooksUpdateListener()
    .subscribe(( bookData: {BOOKS: Books[], count: number }) => {
this.books = bookData.BOOKS;
this.totalPosts = bookData.count;
this.isLoading = false;
    });
  }

  onClear(form: NgForm) {
    this.isLoading = true;
    this.app.getAllIssuedBooks(this.postsPerPage , this.currentPage, this.dept);
    form.reset();
  }


  ngOnDestroy() {
  this.booksub.unsubscribe();
}

}
