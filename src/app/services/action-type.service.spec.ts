import { TestBed, inject } from '@angular/core/testing';

import { ActionTypeService } from './action-type.service';

describe('ActionTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActionTypeService]
    });
  });

  it('should be created', inject([ActionTypeService], (service: ActionTypeService) => {
    expect(service).toBeTruthy();
  }));
});
