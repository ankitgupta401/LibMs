import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Barcode } from '../barcode.service';
import { All } from '../app.service';
import { Subscription } from 'rxjs';
import { Books } from '../books.model';
import { Bars } from '../barcode.model';

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
  // tslint:disable-next-line: variable-name
currentAccession_no: {_id: string, accession_no}[] = [];
constructor(private bar: Barcode, private app: All) { }
onSubmit(form: NgForm) {
  document.getElementById('error_msg').style.display = 'none';
  document.getElementById('success_msg').style.display = 'none';
  this.isLoading = true;
  const book: Books = form.value;
  this.app.findallbookAcc2(form.value.accession_no)
    .subscribe(result => {
      this.gotAcc = result.books;
      if ( this.gotAcc.length > 0 ) {

        document.getElementById('error_msg').style.display = 'block';
        this.isLoading = false;
      } else {
        this.app.addBooks(book, this.currentAccession_no);

      }
    });

}
barcode(accessionNo: number) {

  const bars: Bars = {_id: null, accession_no: accessionNo};

  this.bar.barcodeGenerate(bars);
}

searchbook(form: NgForm) {
  document.getElementById('success_msg').style.display = 'none';
  document.getElementById('error_msg').style.display = 'none';
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
  this.isLoading = false;
 } else {
  this.book = null;
  this.isLoading = false;
 }
 this.app.getAcccession().subscribe( result2 => {
  this.currentAccession_no = result2.accession;
    });
});
} else {
  this.isLoading = false;
}
}

onClear(form: NgForm) {
  form.reset();
  this.isbn = '';
  document.getElementById('success_msg').style.display = 'none';
}
ngOnInit() {

  this.bookSubs = this.app.getBooksUpdateListener()
  .subscribe((result) => {
    this.isLoading = false;

    document.getElementById('success_msg').style.display = 'block';
  });
}

ngOnDestroy() {
  this.bookSubs.unsubscribe();
}

}
