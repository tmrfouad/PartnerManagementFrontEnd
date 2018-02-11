import { TestBed, inject } from '@angular/core/testing';

import { AcceptService } from './accept.service';

describe('AcceptService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AcceptService]
    });
  });

  it('should be created', inject([AcceptService], (service: AcceptService) => {
    expect(service).toBeTruthy();
  }));
});
