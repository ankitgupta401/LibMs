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
qty = 1;
BookForm: NgForm;
  // tslint:disable-next-line: variable-name
currentAccession_no: {_id: string, accession_no}[] = [];
constructor(private bar: Barcode, private app: All) { }
setQty(s) {
  this.qty = s.value;
  if (this.qty <= 0) {
  return  alert('Please Enter Valid Quantity');
  }

}
repeatAdd(form: NgForm) {
  if (this.qty <= 0) {
    return alert('Please Enter Valid Quantity');
  }
  // tslint:disable-next-line: prefer-const
  let form2: Books = form.value;
  let book: Books;
  for (let i = 0; i < this.qty; i++) {
    this.app.getAcccession().subscribe( result2 => {
      this.currentAccession_no = result2.accession;

      book = {
        _id: undefined,
        accession_no: this.currentAccession_no[0].accession_no + i,
        author: form2.author,
        cost: form2.cost,
        edition: form2.edition,
        isbn: form2.isbn,
        pages: form2.pages,
        publisher: form2.publisher,
        remark: form2.remark,
        source: form2.source,
        subject: form2.subject,
        title: form2.title,
        topics: form2.topics,
        volume: form2.volume,
        year: form2.year,
        borrowed: false,
        borrower: '',
        cardNo: '',
        borrow_date: '',
        borrower_email: '',
        borrower_phone: undefined,
        borrower_dept: '',
      };


      this.onSubmit(book);
      this.num++;
    });
  }


}

onSubmit(form: Books) {

  document.getElementById('error_msg').style.display = 'none';
  document.getElementById('success_msg').style.display = 'none';
  this.isLoading = true;
  const book: Books = form;
  this.app.findallbookAcc2(form.accession_no)
    .subscribe(result => {
      this.gotAcc = result.books;
      if ( this.gotAcc.length > 0 ) {

  document.getElementById('error_msg').style.display = 'block';
  this.isLoading = false;
      } else {
        this.app.addBooks(book, this.currentAccession_no);
        this.barcode(form.accession_no);
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

    if (this.qty <= this.num) {
      this.isLoading = false;

      document.getElementById('success_msg').style.display = 'block';
    }

  });
}

ngOnDestroy() {
  this.bookSubs.unsubscribe();
}

}
