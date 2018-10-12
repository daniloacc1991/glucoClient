import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TiraGluco } from '../../models/tira-glucometria';
import { GlucoService } from '../../services/gluco.service';

@Component({
  selector: 'app-edit-gluco',
  templateUrl: './edit-gluco.component.html',
  styleUrls: ['./edit-gluco.component.scss']
})
export class EditGlucoComponent implements OnInit {
  gluco: TiraGluco;

  constructor(private _gs: GlucoService, private router: Router) {
    this.gluco = JSON.parse(localStorage.getItem('glu-edit'));
    console.log(this.gluco);
    localStorage.removeItem('glu-edit');
  }

  ngOnInit() {
  }

  onSubmit() {
    const key = this.gluco.key;
    const data = {
      date: this.gluco.date,
      beforeBreakfast: this.gluco.beforeBreakfast,
      afterBreakfast: this.gluco.afterBreakfast,
      beforeLunch: this.gluco.beforeLunch,
      afterLunch: this.gluco.afterLunch,
      beforeDinner: this.gluco.beforeDinner,
      afterDinner: this.gluco.afterDinner,
    };
    this._gs.update(key, data)
      .then(res => {
        this.router.navigate(['list']);
      })
      .catch(err => {
        console.error(err);
        this.router.navigate(['list']);
      });
  }

}
