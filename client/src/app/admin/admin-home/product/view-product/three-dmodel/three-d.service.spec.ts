import { TestBed } from '@angular/core/testing';

import { ThreeDService } from './three-d.service';

describe('ThreeDService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThreeDService = TestBed.get(ThreeDService);
    expect(service).toBeTruthy();
  });
});
