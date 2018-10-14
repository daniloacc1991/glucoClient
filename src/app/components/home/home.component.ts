import { Component, OnInit } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { GlucoService } from '../../services/gluco.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
  ]
})
export class HomeComponent implements OnInit {
  data: any;
  options: any;

  constructor(private _gs: GlucoService) { }

  ngOnInit() {
    this._gs.charts()
      .then(res => {
        console.log(res);
        this.data = {
          labels: ['beforeBreakfast', 'afterBreakfast', 'beforeLunch', 'afterLunch', 'beforeDinner', 'afterDinner'],
          datasets: res
        };
      })
      .catch(err => {
        console.error(err);
      });
  }

}
