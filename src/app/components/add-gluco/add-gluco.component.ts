import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlucoService } from '../../services/gluco.service';
import { TiraGluco } from '../../models/tira-glucometria';

@Component({
  selector: 'app-add-gluco',
  templateUrl: './add-gluco.component.html',
  styleUrls: ['./add-gluco.component.scss']
})
export class AddGlucoComponent implements OnInit {

  gluco: TiraGluco = {
    date: new Date().valueOf(),
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
