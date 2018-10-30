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
  alto = {
    width: 0,
    height: 0
  };

  constructor(private _gs: GlucoService) {
    this.tamWindows();
  }

  ngOnInit() {
    this._gs.charts()
      .then(res => {
        console.log(res);
        this.data = {
          labels: ['beforeBreakfast', 'afterBreakfast', 'beforeLunch', 'afterLunch', 'beforeDinner', 'afterDinner'],
          datasets: res
        };
        // this.alto = document.getElementsByTagName('body')[0].clientHeight;
        // console.log(this.alto);
      })
      .catch(err => {
        console.error(err);
      });
  }

  tamWindows() {
    if (typeof window.innerWidth !== 'undefined') {
      this.alto.width = window.innerWidth;
      this.alto.height = window.innerHeight;
    } else if (typeof document.documentElement !== 'undefined'
      && typeof document.documentElement.clientWidth !== 'undefined' && document.documentElement.clientWidth !== 0) {
      this.alto.width = document.documentElement.clientWidth;
      this.alto.height = document.documentElement.clientHeight;
    } else {
      this.alto.width = document.getElementsByTagName('body')[0].clientWidth;
      this.alto.height = document.getElementsByTagName('body')[0].clientHeight;
    }
    console.log(this.alto);
  }

}
