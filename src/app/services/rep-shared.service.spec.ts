import { TestBed, inject } from '@angular/core/testing';

import { RepSharedService } from './rep-shared.service';

describe('RepSharedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RepSharedService]
    });
  });

  it('should be created', inject([RepSharedService], (service: RepSharedService) => {
    expect(service).toBeTruthy();
  }));
});
