import { Component, OnInit, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-book-entry',
  templateUrl: './new-book-entry.component.html',
  styleUrls: ['./new-book-entry.component.css']
})
export class NewBookEntryComponent implements OnInit {

  constructor() { }
onSubmit(form: NgForm) {
console.log(form);
}

ngOnInit() {
  }
}
