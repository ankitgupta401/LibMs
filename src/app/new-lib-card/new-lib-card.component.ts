import { Component, OnInit, OnDestroy, } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-lib-card',
  templateUrl: './new-lib-card.component.html',
  styleUrls: ['./new-lib-card.component.css']
})
export class NewLibCardComponent implements OnInit , OnDestroy {
details: {
  address: '',
category: '',
city: '',
dept: '',
email: '',
fname: '',
lname: '',
phone_no: 0,
sem: '',
state: '',
year: '',
zip: 0
}[] = [];
cardNo = 1000;
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
readURL(event, s) {
 this.SelectedFile = event.target.files[0];
 console.log(event.target.files[0]);
 console.log(s);

 this.image = this.SelectedFile.name;

}
onSubmit(form: NgForm) {
  console.log(form);
  this.cardNo = this.cardNo + 1;
  }
  print_Data(form: NgForm) {
   this.details = form.value;
    }

  printPreview() {
    window.print();
  }
  // tslint:disable-next-line: adjacent-overload-signatures
  ngOnInit() {
  }
  ngOnDestroy() {
  this.cardNo = this.cardNo + 1;
  }

}
