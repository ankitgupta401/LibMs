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
    const data = form.value;
    this.isLoading = true;
    if (data.new_pass.length < 8) {
      this.isLoading = false;
      return alert('The Password Shoud Atleast Be of 8 Characters.');
     }
    if (data.new_pass === data.confirm_pass && form.valid === true) {
 this.app.verifyAdminPass(data.current_pass)
 .subscribe(postData => {
if (postData.valid === true) {
this.app.changePass(data.new_pass)
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
    let current = form.value;
    if (form.valid === true) {
      this.app.verifyAdminPass(current.pass)
  .subscribe(postData => {
if (postData.valid === true) {
  this.app.changeEmail(current)
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
