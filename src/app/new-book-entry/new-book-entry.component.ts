import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Barcode } from '../barcode.service';
import { All } from '../app.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-book-entry',
  templateUrl: './new-book-entry.component.html',
  styleUrls: ['./new-book-entry.component.css'],
})
export class NewBookEntryComponent implements OnInit , OnDestroy {
isLoading = false;
bookSubs: Subscription;
  constructor(private bar: Barcode, private app: All) { }
onSubmit(form: NgForm) {
  this.isLoading = true;
  this.app.addBooks(form.value);
}
barcode( form: NgForm) {
  this.bar.barcodeGenerate(form.value.accession_no);
}

ngOnInit() {
  this.bookSubs = this.app.getBooksUpdateListener()
  .subscribe(() => {
    this.isLoading = false;
    alert('Book Saved');
  });
}

ngOnDestroy() {
  this.bookSubs.unsubscribe();
}

}
