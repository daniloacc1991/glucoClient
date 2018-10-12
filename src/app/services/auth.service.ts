import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>;

  constructor(private _afAuth: AngularFireAuth) {
    if (this.loggedIn) {
      this.user = _afAuth.authState;
    }
  }

  login(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      this._afAuth
        .auth
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          localStorage.setItem('user', JSON.stringify(res.user));
          resolve(res);
        })
        .catch(err => reject(err));
    });
  }

  getUser() {
    return firebase.auth().currentUser;
  }

  updateProfile(displayName: string, pothoURL?: string) {
    const user = firebase.auth().currentUser;
    return new Promise((resolve, reject) => {
      user.updateProfile({
        displayName: displayName,
        photoURL: pothoURL
      })
        .then(res => resolve(true))
        .catch(err => reject(false));
    });
  }

  logout() {
    localStorage.removeItem('user');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('user') !== null);
  }
}
