import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import * as randomcolor from 'randomcolor';
import { TiraGluco } from '../models/tira-glucometria';
import { ChartModel } from '../models/chartModel';

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
    return new Promise((resolve, reject) => {
      this.db.list(this.nameDB).update(key, data)
        .then((res) => resolve(true))
        .catch(err => reject(false));
    });
  }

  charts(): Promise<ChartModel[]> {
    return new Promise((resolve, reject) => {
      this.db.list<TiraGluco>('gluco').snapshotChanges()
        .pipe(
          map(changes => changes.map(c => {
            return ({
              label: moment(c.payload.val().date).format('L'),
              backgroundColor: randomcolor(),
              borderColor: randomcolor(),
              data: [c.payload.val().beforeBreakfast, c.payload.val().afterBreakfast, c.payload.val().beforeLunch, c.payload.val().afterLunch, c.payload.val().beforeDinner, c.payload.val().afterDinner]
            });
          }))
        )
        .subscribe(
          d => {
            resolve(d);
          },
          err => {
            reject(err);
          }
        );
    });
  }
}
