import { TestBed } from '@angular/core/testing';

import { DivLoggerService } from './div-logger.service';

describe('DivLoggerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DivLoggerService = TestBed.get(DivLoggerService);
    expect(service).toBeTruthy();
  });
});
