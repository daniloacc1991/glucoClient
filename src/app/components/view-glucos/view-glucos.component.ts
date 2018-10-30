import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { ViewGlucosDataSource } from './view-glucos-datasource';
import { Subscription } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { TiraGluco } from '../../models/tira-glucometria';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-view-glucos',
  templateUrl: './view-glucos.component.html',
  styleUrls: ['./view-glucos.component.scss']
})
export class ViewGlucosComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ViewGlucosDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['date', 'beforeBreakfast', 'afterBreakfast', 'beforeLunch', 'afterLunch', 'beforeDinner', 'afterDinner', 'key'];
  subscription: Subscription;

  constructor(private db: AngularFireDatabase, private router: Router) { }

  ngOnInit() {
    this.subscription = this.db.list<TiraGluco>('gluco').snapshotChanges()
      .pipe(
        map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))),
        map(arr => arr.reverse() )
      )
      .subscribe(d => {
        this.dataSource = new ViewGlucosDataSource(this.paginator, this.sort);
        this.dataSource.data = d;
      });
  }

  edit(row: TiraGluco) {
    localStorage.setItem('glu-edit', JSON.stringify(row));
    this.router.navigate(['edit']);
  }
}
