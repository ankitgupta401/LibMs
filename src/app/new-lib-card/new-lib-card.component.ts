import { Component, OnInit, OnDestroy, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { All } from '../app.service';
import { Libcard } from '../Libcard.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-lib-card',
  templateUrl: './new-lib-card.component.html',
  styleUrls: ['./new-lib-card.component.css']
})
export class NewLibCardComponent implements OnInit , OnDestroy {
  // details: any[] = [];

  private userSub: Subscription;
  today: Date;
  date: any;
  constructor( private app: All) {

  }
  fileToUpload: File = null;
details: Libcard = null;
cardNo: number;
formvalid = false;
  teacher = false;
  SelectedFile = null;
  isLoading = false;
  donesave = false;
  image = 'assets/icons/admin.png';
    disableYear(disYear) {
if (disYear.value === 'teacher') {
  this.teacher = true;
} else {
  this.teacher = false;
}
}

handleFileInput(file: FileList) {
  this.fileToUpload = file.item(0);

 // tslint:disable-next-line: max-line-length
  if ( this.fileToUpload.type === 'image/jpeg' || this.fileToUpload.type === 'image/JPG' || this.fileToUpload.type === 'image/png' || this.fileToUpload.type === 'image/PNG' || this.fileToUpload.type === 'image/JPEG' || this.fileToUpload.type === 'image/JPG') {
  if ( this.fileToUpload.size > 500000) {
alert('File size Exceeds limit');
return ;
}
  this.formvalid = true;
  const reader = new FileReader();
  reader.onload = (event: any) => {
    this.image = event.target.result;
  };
  reader.readAsDataURL(this.fileToUpload);
} else {
  alert('Invalid File Type');
}
}
onSubmit(form: NgForm) {

  this.details = form.value;
  this.details.cardNo = form.value.dept + this.date + form.value.Roll;
  this.app.addLibCard(this.details, this.fileToUpload);
  this.isLoading = true;
  this.app.getUsersUpdateListener().subscribe(() => {
this.isLoading = false;
this.donesave = true;
  });
}
  print_Data() {
    }

  printPreview() {
    window.print();
  }

  // tslint:disable-next-line: adjacent-overload-signatures
  ngOnInit() {
    this.today = new Date();
    this.date = this.today.getUTCFullYear();

  }

  ngOnDestroy() {

  }

}
