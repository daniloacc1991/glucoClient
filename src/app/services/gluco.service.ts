import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { TiraGluco } from '../models/tira-glucometria';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GlucoService {
  private nameDB = 'gluco';

  constructor(private db: AngularFireDatabase) { }

  add(data: TiraGluco) {
    return new Promise((resolve, reject) => {
      this.db.list(this.nameDB).push(data)
        .then((res) => {
          resolve(res.key);
        });
    });
  }

  update(key: string, data: TiraGluco) {
    console.log(key);
    console.log(data);
    return new Promise( (resolve, reject) => {
      this.db.list(this.nameDB).update(key, data)
        .then((res) => resolve(true))
        .catch(err => reject(false));
    });
  }
}
