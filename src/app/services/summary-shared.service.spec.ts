import { TestBed, inject } from '@angular/core/testing';

import { SummarySharedService } from './summary-shared.service';

describe('SummarySharedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SummarySharedService]
    });
  });

  it('should be created', inject([SummarySharedService], (service: SummarySharedService) => {
    expect(service).toBeTruthy();
  }));
});
