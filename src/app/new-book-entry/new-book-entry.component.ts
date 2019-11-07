import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Barcode } from '../barcode.service';
import { All } from '../app.service';
import { Subscription } from 'rxjs';
import { Books } from '../books.model';

@Component({
  selector: 'app-new-book-entry',
  templateUrl: './new-book-entry.component.html',
  styleUrls: ['./new-book-entry.component.css'],
})
export class NewBookEntryComponent implements OnInit , OnDestroy {
isLoading = false;
book: Books = null;
gotAcc: Books[] = [];
bookSubs: Subscription;
isbn: string;
num = 0;
  constructor(private bar: Barcode, private app: All) { }
onSubmit(form: NgForm) {
  this.isLoading = true;

  this.app.findallbookAcc2(form.value.accession_no)
    .subscribe(result => {
      this.gotAcc = result.books;
      if ( this.gotAcc.length > 0 ) {
        alert('A book with the same "Accession No" already exists');
        this.isLoading = false;
      } else {
        this.app.addBooks(form.value);
      }
    });

}
barcode( form: NgForm) {
  this.bar.barcodeGenerate(form.value.accession_no);
}

searchbook(form: NgForm) {
  if ( this.isbn === form.value.isbn ) {
    return;
  }
  this.isbn = form.value.isbn;
  this.isLoading = true;
  if ( form.value.isbn ) {
this.app.searchByIsbn(form.value.isbn)
.subscribe(result => {
 if (result.books.length > 0) {
  this.book = result.books[0];
  console.log(this.book);
  this.isLoading = false;
 } else {
  this.book = null;
  this.isLoading = false;
 }
});
} else {
  this.isLoading = false;
}
}


ngOnInit() {
  this.bookSubs = this.app.getBooksUpdateListener()
  .subscribe((result) => {
    this.isLoading = false;
    alert('Book Saved');
  });
}

ngOnDestroy() {
  this.bookSubs.unsubscribe();
}

}
