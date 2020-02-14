import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Books } from '../books.model';
import { Subscription } from 'rxjs';
import { All } from '../app.service';
import { Barcode } from '../barcode.service';
import { NgForm } from '@angular/forms';
import { Bars } from '../barcode.model';
import { PageEvent, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-single-book-list',
  templateUrl: './single-book-list.component.html',
  styleUrls: ['./single-book-list.component.css']
})
export class SingleBookListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, undefined) paginator: MatPaginator;
  books: Books[] = [];
  bookdel: string;
  isLoading = false;
  number = 0;
  totalPosts = 0;
  postsPerPage = 10;
  gotBook: Books;
  currentPage = 1;
pageSizeOption = [ 5, 10, 20, 30, 50, 100];
  private booksub: Subscription;
  constructor(private app: All, private bar: Barcode) {
   }
onSubmit(form: NgForm) {
  this.isLoading = true;
  const isAcc = form.value.accession_no;
  if (isAcc) {
  this.app.findbookAcc(form.value.accession_no);
  } else {
    if ( form.value.title ) {
      this.app.findbookTitle2(this.postsPerPage , this.currentPage, form.value.title);
    } else if (form.value.author) {
      this.app.findbookAuthor2(this.postsPerPage , this.currentPage, form.value.author);
    } else {
      this.isLoading = false;
    }
  }
}
  ngOnInit() {
    this.app.getBooksAll(this.postsPerPage, this.currentPage , 'yes');
    this.isLoading = true;
    this.booksub = this.app.getBooksUpdateListener()
    .subscribe(( bookData: {BOOKS: Books[], count: number }) => {
this.books = bookData.BOOKS;

this.totalPosts = bookData.count;
this.isLoading = false;
    });
  }
  onDelete(book: Books , form: NgForm ) {
    this.isLoading = true;
    if ( book.borrowed ) {
      this.isLoading = false;
      return alert('Can\'t Delete This Book. It Is Already Issued TO A User');
    }
    this.app.onDeleteBook(book).subscribe(() => {
      const isAcc = form.value.accession_no;
      if (isAcc) {
        this.totalPosts = 1;
        return  this.app.findallbookAcc(form.value.accession_no);

  } else {
    if ( form.value.title !== '') {
      return this.app.findbookTitle2(this.postsPerPage , this.currentPage, form.value.title);
    } else if ( form.value.author !== '' ) {
      return this.app.findbookAuthor2(this.postsPerPage , this.currentPage, form.value.author);
    }
  }
      this.app.getBooksAll(this.postsPerPage , this.currentPage , form.value.isbn);
    });
  }
  onClear(form: NgForm) {

  this.isLoading = true;

  this.app.resetRequired();
  form.reset();
  this.paginator.pageIndex = 0;
  this.isLoading = true;
  this.currentPage = 1;
  this.number = 0;
  this.app.getBooksAll(this.postsPerPage, this.currentPage, 'yes' );

  }



  getDel(book: Books) {
this.gotBook = book;
    }
    ngOnDestroy() {
      this.booksub.unsubscribe();
    }


addBarCode(accNo: number) {
  this.isLoading = true;
  this.bar.findAll(accNo)
  .subscribe(result => {
    if (result.codes.length > 0) {
    alert('Already exists in the New Book Entry Page/ Print ');
    } else {
      const bars: Bars = {_id: null, accession_no: accNo};
      this.bar.barcodeGenerate(bars);
    }
    this.isLoading = false;
  });


}


onChange(PageData: PageEvent, form: NgForm) {
  this.isLoading = true;
  this.currentPage = PageData.pageIndex + 1;
  this.postsPerPage = PageData.pageSize;
  const isAcc = form.value.accession_no;
  if (isAcc) {
return  this.app.findallbookAcc(form.value.accession_no);
} else {
if ( form.value.title) {
  return this.app.findbookTitle2(this.postsPerPage , this.currentPage, form.value.title);
} else if ( form.value.author) {
  return this.app.findbookAuthor2(this.postsPerPage , this.currentPage, form.value.author);
} else {
  this.app.getBooksAll(this.postsPerPage , this.currentPage, 'yes' );
}
}

  if (this.currentPage > 1 ) {
this.number = this.postsPerPage * PageData.pageIndex;
  } else {
    this.number = 0;
  }
  }



}

