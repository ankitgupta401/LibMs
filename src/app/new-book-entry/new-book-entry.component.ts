import { Component, OnInit, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Barcode } from '../barcode.service';

@Component({
  selector: 'app-new-book-entry',
  templateUrl: './new-book-entry.component.html',
  styleUrls: ['./new-book-entry.component.css'],
})
export class NewBookEntryComponent implements OnInit {

  constructor(private bar: Barcode) { }
onSubmit(form: NgForm) {
console.log(form);
}
barcode( form: NgForm) {
  this.bar.barcodeGenerate(form.value.accession_no);
}

ngOnInit() {
  }
}
