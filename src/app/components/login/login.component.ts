import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  fieldUserName = '';
  fieldPassword = '';
  hide = true;
  messageError: string;
  isLoading = false;

  constructor(private _as: AuthService, private router: Router) {
    if (this._as.loggedIn) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
  }

  login() {
    this.isLoading = true;
    if (!this.fieldUserName && !this.fieldPassword) {
      return;
    }
    this._as.login(this.fieldUserName, this.fieldPassword)
      .then(res => {
        this.isLoading = false;
        this.router.navigate(['home']);
      })
      .catch(err => {
        this.messageError = err.message;
        this.isLoading = false;
      });
  }

}
