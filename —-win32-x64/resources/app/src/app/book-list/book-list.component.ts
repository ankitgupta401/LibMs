import { Component, OnInit , OnDestroy, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { All } from '../app.service';
import { Books } from '../books.model';
import { Subscription } from 'rxjs';
import { Barcode } from '../barcode.service';
import { PageEvent, throwToolbarMixedModesError, TransitionCheckState, MatPaginator } from '@angular/material';
import { Bars } from '../barcode.model';



@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, undefined) paginator: MatPaginator;
  books: any[] = [];
  bookdel: string;
  isLoading = false;
  number = 0;
  totalPosts = 0;
  postsPerPage = 10;
  available: number[];
  currentPage = 1;
pageSizeOption = [ 5, 10, 20, 30, 50, 100];
  private booksub: Subscription;
  constructor(private app: All, private bar: Barcode) {
   }
onSubmit(form: NgForm) {
  this.isLoading = true;
  const isAcc = form.value.accession_no;
  if (isAcc) {
  this.app.findallbookAcc3(form.value.accession_no).subscribe(result => {
    this.books = result.books;
    console.log(result);
    if ( result.count) {
      this.books[0].total = result.count;
      this.totalPosts = 1;
      this.getAvailable();
    } else {
      this.totalPosts = 0;
      this.isLoading = false;
    }

  });
  } else {
    if ( form.value.title) {
      this.app.findbookTitle(this.postsPerPage , this.currentPage, form.value.title);
    } else if (form.value.author) {
      this.app.findbookAuthor(this.postsPerPage , this.currentPage, form.value.author);
    } else {
      this.isLoading = false;
    }

  }
}
  ngOnInit() {

    this.app.getBooks(this.postsPerPage, this.currentPage);
    this.isLoading = true;
    this.booksub = this.app.getBooksUpdateListener()
    .subscribe(( bookData: {BOOKS: Books[], count: number }) => {

      this.books = bookData.BOOKS;
      this.totalPosts = bookData.count;
      this.isLoading = false;
      if ( this.books.length > 0) {
        this.getAvailable();
      }

    });
  }

  ngOnDestroy() {
    this.booksub.unsubscribe();
  }

  onClear(form: NgForm) {
    this.paginator.pageIndex = 0;
    this.isLoading = true;
    this.currentPage = 1;
    this.number = 0;
    this.app.getBooks(this.postsPerPage, this.currentPage);

  }
getbyisbn(isbn: string, f: any ) {
this.app.getRequiredIsbn(isbn);
f.click();
}



onChange(PageData: PageEvent, form: NgForm) {
  this.isLoading = true;
  this.currentPage = PageData.pageIndex + 1;
  this.postsPerPage = PageData.pageSize;
  const isAcc = form.value.accession_no;
  if (isAcc) {
  this.app.findallbookAcc3(form.value.accession_no).subscribe(result => {
    this.books = result.books;

    if ( this.books.length > 0) {
      this.books[0].total = result.count;
      this.totalPosts = result.count;
      this.getAvailable();
    }
    this.totalPosts = 0;
    this.isLoading = false;
  });
  } else {
    if ( form.value.title) {
      this.app.findbookTitle(this.postsPerPage , this.currentPage, form.value.title);
    } else if (form.value.author) {
      this.app.findbookAuthor(this.postsPerPage , this.currentPage, form.value.author);
    } else {

      this.app.getBooks(this.postsPerPage , this.currentPage);
      if (this.currentPage > 1 ) {
    this.number = this.postsPerPage * PageData.pageIndex;
      } else {
        this.number = 0;
      }
    }
  }

  }

getAvailable() {

  // tslint:disable-next-line: prefer-for-of
  for (let i = 0; i < this.books.length; i++) {
    this.app.getAvailable(this.books[i].isbn).subscribe(result => {
      this.books[i].available = result.available;

      });
    this.isLoading = false;
  }

}

}
