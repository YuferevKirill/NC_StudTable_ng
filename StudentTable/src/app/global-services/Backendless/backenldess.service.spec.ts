import { TestBed } from '@angular/core/testing';

import { BackenldessService } from './backenldess.service';

describe('BackenldessService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BackenldessService = TestBed.get(BackenldessService);
    expect(service).toBeTruthy();
  });
});
