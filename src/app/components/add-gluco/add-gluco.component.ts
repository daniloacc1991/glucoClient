import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { GlucoService } from '../../services/gluco.service';
import { TiraGluco } from '../../models/tira-glucometria';

import * as _moment from 'moment';

const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-add-gluco',
  templateUrl: './add-gluco.component.html',
  styleUrls: ['./add-gluco.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class AddGlucoComponent implements OnInit {

  gluco: TiraGluco = {
    date: moment(),
    beforeBreakfast: 0,
    afterBreakfast: 0,
    beforeLunch: 0,
    afterLunch: 0,
    beforeDinner: 0,
    afterDinner: 0,
  };


  constructor(private _gs: GlucoService, private router: Router) { }

  ngOnInit() {

  }

  onSubmit() {
    console.log(this.gluco);
    this.gluco.date = new Date(this.gluco.date).valueOf();
    this._gs.add(this.gluco)
      .then(res => {
        this.router.navigate(['list']);
      })
      .catch(err => {
        console.log(err);
      });
  }

}
