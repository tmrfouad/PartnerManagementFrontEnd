import { TestBed, inject } from '@angular/core/testing';

import { RfqService } from './rfq.service';

describe('RfqService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RfqService]
    });
  });

  it('should be created', inject([RfqService], (service: RfqService) => {
    expect(service).toBeTruthy();
  }));
});
