import { TestBed } from '@angular/core/testing';

import { GlucoService } from './gluco.service';

describe('GlucoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlucoService = TestBed.get(GlucoService);
    expect(service).toBeTruthy();
  });
});
