import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-lib-card-reg',
  templateUrl: './lib-card-reg.component.html',
  styleUrls: ['./lib-card-reg.component.css']
})
export class LibCardRegComponent implements OnInit {

  constructor() { }
onSubmit(form: NgForm ) {
console.log(form);
}
  ngOnInit() {
  }

}
