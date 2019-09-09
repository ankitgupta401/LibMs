import { Component, OnInit } from '@angular/core';
import { Barcode } from '../barcode.service';

@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.css'],
})
export class BarcodeComponent implements OnInit {

accList = [];
  constructor(private bar: Barcode) {
    console.log(this.bar.accList);
    this.accList = this.bar.accList;
   }
   print() {
    window.print();
    }
  ngOnInit() {
  }

}
