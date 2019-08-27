import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Type } from '@angular/compiler';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-lib-card',
  templateUrl: './new-lib-card.component.html',
  styleUrls: ['./new-lib-card.component.css']
})
export class NewLibCardComponent implements OnInit {
  teacher = false;
  SelectedFile = null;
  image = 'http://placehold.it/180';
    disableYear(disYear) {
if (disYear.value === 'teacher') {
  this.teacher = true;
} else {
  this.teacher = false;
}
}
readURL(event , g) {
 this.SelectedFile = event.target.files[0];
 console.log(event.target.files[0]);

 this.image = this.SelectedFile.name;

}
onSubmit(form: NgForm) {
  console.log(form);
  }
  ngOnInit() {
  }

}
