import { Component, OnInit } from '@angular/core';
import { Barcode } from './barcode.service';
import { All } from './app.service';


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


