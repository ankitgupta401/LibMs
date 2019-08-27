import { Component, OnInit , Input} from '@angular/core';


@Component({
  selector: 'app-lay',
  templateUrl: './lay.component.html',
  styleUrls: ['./lay.component.css']
})
export class LayComponent implements OnInit {
Content = 'New Book Entry';
@Input() Open: boolean;

  constructor() { }

  ngOnInit() {
  }

}
