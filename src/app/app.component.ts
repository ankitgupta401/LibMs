import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
}
