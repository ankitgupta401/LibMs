import { Component, OnInit, OnDestroy, } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-lib-card',
  templateUrl: './new-lib-card.component.html',
  styleUrls: ['./new-lib-card.component.css']
})
export class NewLibCardComponent implements OnInit , OnDestroy {
  // details: any[] = [];
  fileToUpload: File = null;
details: {
  address: '',
category: '',
city: '',
dept: '',
email: '',
fname: '',
lname: '',
phone_no: 0,
Roll: 0,
sem: '',
state: '',
year: '',
zip: 0,
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

handleFileInput(file: FileList) {
  this.fileToUpload = file.item(0);
  const reader = new FileReader();
  reader.onload = (event: any) => {
    this.image = event.target.result;
  };
  reader.readAsDataURL(this.fileToUpload);
}
onSubmit(form: NgForm) {
  console.log(form);
  this.details = form.value;
  this.cardNo = this.cardNo + 1;
}
  print_Data(form: NgForm) {

    }

  printPreview() {
    window.print();
  }
  // tslint:disable-next-line: adjacent-overload-signatures
  ngOnInit() {
  }

  ngOnDestroy() {

  }

}
