import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { All } from '../app.service';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.css']
})
export class ManageAccountComponent implements OnInit {
  isLoading = false;

  constructor(private app: All) { }
  ChangePass(form: NgForm) {
    this.isLoading = true;
    if (form.value.new_pass === form.value.confirm_pass && form.valid === true) {
 this.app.verifyAdminPass(form.value.current_pass)
 .subscribe(postData => {
if (postData.valid === true) {
this.app.changePass(form.value.new_pass)
.subscribe(result => {
  this.isLoading = false;
  return alert('Password Changed Successfully');

});
} else {
  this.isLoading = false;
  return alert('Invalid Password');
}

 });
} else {
 this.isLoading = false;
 return alert('Passwords Dont Match!!!');
}

  }


  changeEmail(form: NgForm) {
    this.isLoading = true;
    if (form.valid === true) {
      this.app.verifyAdminPass(form.value.pass)
  .subscribe(postData => {
if (postData.valid === true) {
  this.app.changeEmail(form.value)
  .subscribe(posData => {
    this.isLoading = false;
    return alert(posData.message);
  });
} else {
  this.isLoading = false;
  return alert('Invalid Password!!');
}
});
    } else {
      this.isLoading = false;
      return alert('Invalid Details');
    }
  }

  ngOnInit() {
  }

}
