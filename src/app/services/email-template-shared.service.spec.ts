import { TestBed, inject } from '@angular/core/testing';

import { EmailTemplateSharedService } from './email-template-shared.service';

describe('EmailTemplateSharedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmailTemplateSharedService]
    });
  });

  it('should be created', inject([EmailTemplateSharedService], (service: EmailTemplateSharedService) => {
    expect(service).toBeTruthy();
  }));
});
