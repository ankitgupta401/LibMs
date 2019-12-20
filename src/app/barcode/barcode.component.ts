import { Component, OnInit } from '@angular/core';
import { Barcode } from '../barcode.service';
import { Bars } from '../barcode.model';

@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.css'],
})
export class BarcodeComponent implements OnInit {
  Barcodes: Bars[];
  isLoading = false;
  constructor(private bar: Barcode) {
   }
   print() {
    window.print();
    }
    ClearAll() {
      this.isLoading = true;
      this.bar.clear()
      .subscribe((postData) => {
       this.Barcodes = null;
       this.isLoading = false;
       alert(postData.message);
      });

    }
  ngOnInit() {
    this.isLoading = true;
    this.bar.getBarcodes()
    .subscribe((postData) => {
this.Barcodes = postData.barcodes;
this.isLoading = false;
    });
  }

}
