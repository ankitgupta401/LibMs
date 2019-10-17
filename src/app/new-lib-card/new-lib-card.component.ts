import { Component, OnInit, OnDestroy, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { All } from '../app.service';
import { Libcard } from '../Libcard.model';

@Component({
  selector: 'app-new-lib-card',
  templateUrl: './new-lib-card.component.html',
  styleUrls: ['./new-lib-card.component.css']
})
export class NewLibCardComponent implements OnInit , OnDestroy {
  // details: any[] = [];
  constructor( private app: All) {}
  fileToUpload: File = null;
details: Libcard = null;
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
  this.details.cardNo = this.cardNo;
  this.app.addLibCard(this.details);
  this.cardNo++;
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
