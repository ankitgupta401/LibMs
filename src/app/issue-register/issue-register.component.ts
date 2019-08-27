import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-issue-register',
  templateUrl: './issue-register.component.html',
  styleUrls: ['./issue-register.component.css']
})
export class IssueRegisterComponent implements OnInit {

  constructor() { }
onSubmit(form: NgForm) {
  console.log(form);
}
  ngOnInit() {
  }

}
