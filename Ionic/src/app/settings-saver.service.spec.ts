import { TestBed } from '@angular/core/testing';

import { SettingsSaverService } from './settings-saver.service';

describe('SettingsSaverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SettingsSaverService = TestBed.get(SettingsSaverService);
    expect(service).toBeTruthy();
  });
});
