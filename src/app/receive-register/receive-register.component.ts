import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-receive-register',
  templateUrl: './receive-register.component.html',
  styleUrls: ['./receive-register.component.css']
})
export class ReceiveRegisterComponent implements OnInit {

  constructor() { }
onSubmit(form: NgForm) {
console.log(form);
}
  ngOnInit() {
  }

}
