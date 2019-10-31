import { Component, OnInit } from '@angular/core';
import { Barcode } from './barcode.service';
import { All } from './app.service';








"use strict";
anychart.onDocumentReady(function () {
    // set the data
    var data = [
        { x: "Total Book", value: 10000 },
        { x: "Book Issued", value: 7000},
        { x: "Book Return", value: 1000 },
        { x: "Book Aval", value: 4000 },
      //  { x: "Native Hawaiian and Other Pacific Islander", value: 540013 },
      //   { x: "Some  Other Race", value: 19107368 },
      //   { x: "Two or More Races", value: 9009073 }
    ];
    // create the chart
    var chart = anychart.pie();
    // set the chart title
    chart.title("Total book issue + total return");
    // add the data
    chart.data(data);
    // display the chart in the container
    chart.container('container');
    chart.draw();
});




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
providers: [Barcode, All]



})
export class AppComponent implements OnInit {
  title = 'Libms';
  onOpen = 0;
  open = true;
  toggle(): void {
    if (this.onOpen === 0) {
       this.onOpen = 1;
       this.open = false;
    } else {
      this.onOpen = 0;
      this.open = true;
    }

  }

constructor(private bar: Barcode) {}
ngOnInit(): void {

}
}


