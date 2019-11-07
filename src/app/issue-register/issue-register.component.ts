import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { All } from '../app.service';
import { Books } from '../books.model';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-issue-register',
  templateUrl: './issue-register.component.html',
  styleUrls: ['./issue-register.component.css']
})
export class IssueRegisterComponent implements OnInit , OnDestroy {
  totalPosts = 0;
  postsPerPage = 10;
  number = 0;
  currentPage = 1;
pageSizeOption = [ 5, 10, 20, 30, 50, 100];
isLoading = false;
dept = '';
private booksub: Subscription;
books: Books[] = [];
  constructor(private app: All) { }
onSubmit(form: NgForm) {
  this.isLoading = true;
  const isAcc = form.value.accession_no;
  if (isAcc) {
  this.app.findbookAcc(form.value.accession_no);
  } else {
    if ( form.value.cardNo ) {
      this.app.findbookCard(this.postsPerPage , this.currentPage, form.value.cardNo);
    }
  }
}
  ngOnInit() {
    this.app.getAllIssuedBooks(this.postsPerPage , this.currentPage , this.dept);
    this.isLoading = true;
    this.booksub = this.app.getBooksUpdateListener()
    .subscribe(( bookData: {BOOKS: Books[], count: number }) => {
this.books = bookData.BOOKS;
this.totalPosts = bookData.count;
this.isLoading = false;
    });
  }

onClear(form: NgForm) {
  this.isLoading = true;
  this.app.getAllIssuedBooks(this.postsPerPage , this.currentPage , this.dept);
  form.reset();
}



  deptSort(form: NgForm) {
  this.isLoading = true;
  this.dept = form.value.dept;
  this.app.getAllIssuedBooks(this.postsPerPage , this.currentPage, this.dept);

  }

  onChange(PageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = PageData.pageIndex + 1;
    this.postsPerPage = PageData.pageSize;
    this.app.getAllIssuedBooks(this.postsPerPage , this.currentPage, this.dept);
    if (this.currentPage > 1 ) {
  this.number = this.postsPerPage * PageData.pageIndex;
    } else {
      this.number = 0;
    }
    }

ngOnDestroy() {
  this.booksub.unsubscribe();
}

}
