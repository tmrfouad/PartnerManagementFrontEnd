import { TestBed, inject } from '@angular/core/testing';

import { PartnerAuthGuard } from './partner-auth-guard';

describe('PartnerAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PartnerAuthGuard]
    });
  });

  it('should be created', inject([PartnerAuthGuard], (service: PartnerAuthGuard) => {
    expect(service).toBeTruthy();
  }));
});
