import { TestBed, inject } from '@angular/core/testing';

import { RepService } from './rep.service';

describe('RepService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RepService]
    });
  });

  it('should be created', inject([RepService], (service: RepService) => {
    expect(service).toBeTruthy();
  }));
});
