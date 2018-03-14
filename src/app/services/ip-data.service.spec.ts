import { TestBed, inject } from '@angular/core/testing';

import { IpDataService } from './ip-data.service';

describe('IpDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IpDataService]
    });
  });

  it('should be created', inject([IpDataService], (service: IpDataService) => {
    expect(service).toBeTruthy();
  }));
});
