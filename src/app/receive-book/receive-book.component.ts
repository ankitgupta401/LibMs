import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-receive-book',
  templateUrl: './receive-book.component.html',
  styleUrls: ['./receive-book.component.css']
})
export class ReceiveBookComponent implements OnInit {

  constructor() { }
onSubmit(form: NgForm) {
  console.log(form);
}
  ngOnInit() {
  }

}
