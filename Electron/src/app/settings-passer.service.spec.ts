import { TestBed } from '@angular/core/testing';

import { SettingsPasserService } from './settings-passer.service';

describe('SettingsPasserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SettingsPasserService = TestBed.get(SettingsPasserService);
    expect(service).toBeTruthy();
  });
});
