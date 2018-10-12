import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private _afAuth: AngularFireAuth) { }

  doLogin(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      this._afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  }
}
