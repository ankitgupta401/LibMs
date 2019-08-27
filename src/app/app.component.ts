import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Libms';
  onOpen = 1;
  open = 0;
  toggle(): void {
    if (this.onOpen === 1) {this.onOpen = 2;
    } else {
      this.onOpen = 1;
    }
}
}
