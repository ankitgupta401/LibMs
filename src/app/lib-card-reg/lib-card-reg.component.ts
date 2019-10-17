import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { All } from '../app.service';
import { Libcard } from '../Libcard.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lib-card-reg',
  templateUrl: './lib-card-reg.component.html',
  styleUrls: ['./lib-card-reg.component.css']
})
export class LibCardRegComponent implements OnInit {
LibCard: Libcard[] = [];
year = 2019;
private userSub: Subscription;
  constructor(private app: All) {
  }
onSubmit(form: NgForm ) {
console.log(form);
}
  ngOnInit() {
    this.app.getUsers();
    this.userSub = this.app.getUsersUpdateListener()
      .subscribe((users: Libcard[]) => {
        this.LibCard = users;
      });
  }
onDelete(id: string) {
this.app.DeleteUser(id);
}
}
