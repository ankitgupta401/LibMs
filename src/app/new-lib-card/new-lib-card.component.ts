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
  constructor( private app: All) {

  }
  fileToUpload: File = null;
details: Libcard = null;
cardNo: number;
  teacher = false;
  SelectedFile = null;
  isLoading = false;
  donesave = false;
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

  this.details = form.value;
  this.details.cardNo = this.cardNo;
  this.app.addLibCard(this.details);
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
    this.app.getUsers();
    this.isLoading = true;
    this.userSub = this.app.getUsersUpdateListener()
    .subscribe((users: Libcard[]) => {
if ( users.length  <= 0) {
this.cardNo = 1000;
} else {
  this.cardNo = users[users.length - 1].cardNo + 1 ;
}
this.isLoading = false;
    });

  }

  ngOnDestroy() {
this.userSub.unsubscribe();
  }

}
