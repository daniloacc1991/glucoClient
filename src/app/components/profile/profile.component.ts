import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User = {
    email: '',
    displayName: '',
    photoURL: ''
  };

  constructor(private _as: AuthService) { }

  ngOnInit() {
    const userAuth = this._as.getUser();
    this.user.displayName = userAuth.displayName;
    this.user.email = userAuth.email;
    this.user.photoURL = userAuth.photoURL;
  }

  onSubmit() {
    this._as.updateProfile(this.user.displayName, this.user.photoURL)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

}
