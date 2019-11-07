import { Component, OnInit , OnDestroy} from '@angular/core';
import { NgForm } from '@angular/forms';
import { All } from '../app.service';
import { Books } from '../books.model';
import { Subscription } from 'rxjs';
import { Barcode } from '../barcode.service';
import { PageEvent, throwToolbarMixedModesError, TransitionCheckState } from '@angular/material';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {
  books: Books[] = [];
  bookdel: string;
  isLoading = false;
  number = 0;
  totalPosts = 0;
  postsPerPage = 10;
  currentPage = 1;
pageSizeOption = [ 5, 10, 20, 30, 50, 100];
  private booksub: Subscription;
  constructor(private app: All, private bar: Barcode) {
   }
onSubmit(form: NgForm) {
  this.isLoading = true;
  const isAcc = form.value.accession_no;
  if (isAcc) {
  this.app.findallbookAcc(form.value.accession_no);
  } else {
    if ( form.value.title ) {
      this.app.findbookTitle(this.postsPerPage , this.currentPage, form.value.title);
    } else {
      this.app.findbookAuthor(this.postsPerPage , this.currentPage, form.value.author);
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
    });
  }
  onDelete(id: string) {
    this.isLoading = true;
    this.app.onDeleteBook(id).subscribe(() => {
    this.app.getBooks(this.postsPerPage , this.currentPage);
    });
  }
  onClear(form: NgForm) {
  this.isLoading = true;
  this.app.getBooks(this.postsPerPage, this.currentPage);
  form.reset();
  }



  getDel(id: string) {
    this.bookdel = id;
    }
    ngOnDestroy() {
      this.booksub.unsubscribe();
    }


addBarCode(accNo: number) {
if ( this.bar.accList.length <= 0) {
  this.bar.barcodeGenerate(accNo);
  alert('Barcode is generated in the NEW BOOK ENTRY PAGE inside the Print option');
} else {
if ( this.bar.accList.filter(u => u === accNo )) {
alert('Already Exists in the NEW BOOK ENTRY PAGE inside the Print option');
}
}
}


onChange(PageData: PageEvent) {
  this.isLoading = true;
  this.currentPage = PageData.pageIndex + 1;
  this.postsPerPage = PageData.pageSize;
  this.app.getBooks(this.postsPerPage , this.currentPage);
  if (this.currentPage > 1 ) {
this.number = this.postsPerPage * PageData.pageIndex;
  } else {
    this.number = 0;
  }
  }



}
