import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGlucoComponent } from './add-gluco.component';

describe('AddGlucoComponent', () => {
  let component: AddGlucoComponent;
  let fixture: ComponentFixture<AddGlucoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGlucoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGlucoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
