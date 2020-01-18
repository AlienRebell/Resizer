import { TestBed } from '@angular/core/testing';

import { DataPasserService } from './data-passer.service';

describe('DataPasserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataPasserService = TestBed.get(DataPasserService);
    expect(service).toBeTruthy();
  });
});
