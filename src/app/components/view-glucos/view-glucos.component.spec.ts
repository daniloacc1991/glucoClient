
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGlucosComponent } from './view-glucos.component';

describe('ViewGlucosComponent', () => {
  let component: ViewGlucosComponent;
  let fixture: ComponentFixture<ViewGlucosComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewGlucosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewGlucosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
