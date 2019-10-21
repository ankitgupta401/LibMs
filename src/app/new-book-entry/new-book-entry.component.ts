import { Component, OnInit, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Barcode } from '../barcode.service';
import { All } from '../app.service';

@Component({
  selector: 'app-new-book-entry',
  templateUrl: './new-book-entry.component.html',
  styleUrls: ['./new-book-entry.component.css'],
})
export class NewBookEntryComponent implements OnInit {
isLoading = false;
  constructor(private bar: Barcode, private app: All) { }
onSubmit(form: NgForm) {
this.app.addBooks(form.value);
this.isLoading = true;
this.app.getBooksUpdateListener()
.subscribe(() => {
this.isLoading = false;
});
}
barcode( form: NgForm) {
  this.bar.barcodeGenerate(form.value.accession_no);
}

ngOnInit() {
  }
}
