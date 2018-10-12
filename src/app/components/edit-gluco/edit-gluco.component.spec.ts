import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGlucoComponent } from './edit-gluco.component';

describe('EditGlucoComponent', () => {
  let component: EditGlucoComponent;
  let fixture: ComponentFixture<EditGlucoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditGlucoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGlucoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
