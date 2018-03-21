import { TestBed, inject } from '@angular/core/testing';

import { RfqSharedService } from './rfq-shared.service';

describe('SharedDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RfqSharedService]
    });
  });

  it('should be created', inject([RfqSharedService], (service: RfqSharedService) => {
    expect(service).toBeTruthy();
  }));
});
