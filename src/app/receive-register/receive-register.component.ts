import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReceiveReg } from '../receiveReg.model';
import { All } from '../app.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';
@Component({
  selector: 'app-receive-register',
  templateUrl: './receive-register.component.html',
  styleUrls: ['./receive-register.component.css']
})
export class ReceiveRegisterComponent implements OnInit , OnDestroy {
recReg: ReceiveReg[];
isLoading = false;
number = 0;
totalPosts = 0;
postsPerPage = 10;
currentPage = 1;
dept = '';
show = true;
pageSizeOption = [ 5, 10, 20, 30, 50, 100];
booksub: Subscription;
booksubs2: Subscription;
  constructor(private app: All) { }
onSubmit(form: NgForm) {
  this.isLoading = true;
  const isAcc = form.value.accession_no;
  if (isAcc) {
    this.booksubs2 = this.app.findallrecregAcc(this.postsPerPage , this.currentPage, form.value.accession_no)
  .subscribe(response => {
    this.recReg = response.books;
    this.totalPosts = response.count;
    this.isLoading = false;
  });
  } else {
    if (form.value.cardNo) {
      this.booksubs2  = this.app.findallrecregCard(this.postsPerPage , this.currentPage, form.value.cardNo)
      .subscribe(response => {
        this.recReg = response.books;
        this.totalPosts = response.books.length;
        this.isLoading = false;
      });
    }
  }
}
toggle() {
  if (this.show === true) {
    this.show = false;
  } else {
    this.show = true;
  }
}
  ngOnInit() {
    this.isLoading = true;
    this.booksub =  this.app.getAllRecRegBooks(this.postsPerPage , this.currentPage, this.dept)
.subscribe(response => {
this.recReg = response.books;
this.totalPosts = response.count;
this.isLoading = false;
});
  }


onClear(form: NgForm) {
this.isLoading = true;
form.reset();
this.booksub = this.app.getAllRecRegBooks(this.postsPerPage , this.currentPage, this.dept).subscribe(response => {
  this.recReg = response.books;
  this.totalPosts = response.count;
  this.isLoading = false;
  });
}


  onChange(PageData: PageEvent, form: NgForm) {
    this.isLoading = true;
    this.currentPage = PageData.pageIndex + 1;
    this.postsPerPage = PageData.pageSize;
    const isAcc = form.value.accession_no;
    if (isAcc) {
      this.booksubs2 = this.app.findallrecregAcc(this.postsPerPage , this.currentPage, form.value.accession_no)
    .subscribe(response => {
      this.recReg = response.books;
      this.totalPosts = response.count;
      this.isLoading = false;
    });
      return;
    } else {
      if (form.value.cardNo) {
        this.booksubs2  = this.app.findallrecregCard(this.postsPerPage , this.currentPage, form.value.cardNo)
        .subscribe(response => {
          this.recReg = response.books;
          this.totalPosts = response.count;
          this.isLoading = false;
        });
        return;
      }
    }
    this.app.getAllRecRegBooks(this.postsPerPage , this.currentPage, this.dept)
    .subscribe(response => {
      this.recReg = response.books;
      this.totalPosts = response.count;
      this.isLoading = false;
      });
    if (this.currentPage > 1 ) {
  this.number = this.postsPerPage * PageData.pageIndex;
    } else {
      this.number = 0;
    }
    }

    deptSort(form: NgForm) {
      this.isLoading = true;
      this.dept = form.value.dept;
      this.app.getAllRecRegBooks(this.postsPerPage , this.currentPage, this.dept)
    .subscribe(response => {
      this.recReg = response.books;
      this.totalPosts = response.count;
      this.isLoading = false;
      });

    }
ngOnDestroy() {
this.booksub.unsubscribe();
}
}
