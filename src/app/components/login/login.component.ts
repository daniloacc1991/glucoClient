import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  fieldUserName = '';
  fieldPassword = '';

  constructor(private _as: AuthenticationService) { }

  ngOnInit() {
  }

  login() {
    console.log(this.fieldPassword);
    console.log(this.fieldUserName);
    if (!this.fieldUserName && !this.fieldPassword) {
      return;
    }
    this._as.doLogin(this.fieldUserName, this.fieldPassword)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
  }

}
